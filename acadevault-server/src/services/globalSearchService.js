import Fuse from 'fuse.js';
import AcademicMaterial from '../api/models/AcademicMaterialModel.js';
import Category from '../api/models/CategoryModel.js';
import Shop from '../api/models/ShopModel.js';
import attachMaterialPrices from '../utils/priceUtils.js';

// Define resource configurations
const searchResources = [
  {
    model: AcademicMaterial,
    type: 'material',
    searchableFields: [
      'title',
      'description',
      'summary',
      'tags',
      'categories.name',
      'shop.businessName',
      'department.name',
    ],
    projectFields:
      'title description summary materialType price coverImage thumbnail createdAt isPromoted isFeatured isTrending premium deliveryFormat academicLevel academicDegree department tags analytics salesCount rating numReviews categories shop',

    populate: [
      { path: 'categories', select: 'name' },
      { path: 'shop', select: 'businessName' },
      { path: 'department', select: 'name' },
    ],

    transform: (item) => {
      const price = item.finalPrice || {};
      return {
        _id: item._id,
        type: 'material',
        title: item.title,
        description: item.summary || item.description?.slice(0, 120),
        thumbnail: item.thumbnail || null,

        price: {
          amount: price.amount ?? null,
          formatted: price.formatted ?? null,
          originalAmount: price.originalAmount ?? null,
          discountApplied: price.discountApplied ?? false,
          currencySymbol: price.currencySymbol ?? '₦',
        },
        statusFlags: {
          isPromoted: item.isPromoted,
          isFeatured: item.isFeatured,
          isTrending: item.isTrending,
          isPremium: item.premium,
        },

        extra: {
          materialType: item.materialType,
          deliveryFormat: item.deliveryFormat,
          academicLevel: item.academicLevel,
          academicDegree: item.academicDegree,
          department: item.department?.name || null,
          categories: item.categories?.map((c) => c.name),
          shop: {
            name: item.shop?.businessName || null,
            id: item.shop?._id,
          },
          tags: item.tags || [],
        },

        analytics: {
          views: item.analytics?.viewsCount || 0,
          sales: item.salesCount || 0,
          rating: item.rating || null,
          reviews: item.numReviews || 0,
        },

        createdAt: item.createdAt,
      };
    },
  },
  {
    model: Shop,
    type: 'shop',
    searchableFields: ['businessName', 'description'],
    projectFields: 'businessName description logo createdAt',
    transform: (item) => ({
      _id: item._id,
      type: 'shop',
      title: item.businessName,
      description: item.description?.slice(0, 150) || '',
      image: item.logo?.url || item.owner?.profilePicture?.url || null,
      extra: {
        owner: item.owner?.name,
        location: item.addresses?.[0]?.fullAddress || null,
        contact: {
          phone: item.contactInfo?.phone || null,
          email: item.contactInfo?.email || null,
          whatsapp: item.contactInfo?.whatsapp || null,
        },
        socialMedia: item.contactInfo?.socialMediaLinks || [],
      },
      createdAt: item.createdAt,
    }),
  },
  {
    model: Category,
    type: 'category',
    searchableFields: ['name', 'description'],
    projectFields: 'name description image createdAt',
    transform: (item) => ({
      _id: item._id,
      type: 'category',
      title: item.name,
      description: item.description?.slice(0, 120) || '',
      image: item.image || null,
      extra: {
        materialCount: item.materialCount || 0,
        parentCategory: item.parentCategory || null,
        materialTypes: item.materialTypes || [],
        categoryType: item.categoryType,
      },
      createdAt: item.createdAt,
    }),
  },
];

export const globalSearch = async (query) => {
  const {
    search,
    page = 1,
    limit = 12,
    sort = '-createdAt',
    currency = 'NGN',
    region = null,
  } = query;

  if (!search) throw new Error('Search query is required.');

  const skip = (page - 1) * limit;
  const searchRegex = new RegExp(search, 'i');

  const resource = searchResources[0]; // Only AcademicMaterial now

  const searchConditions = {
    $or: resource.searchableFields.map((field) => ({
      [field]: { $regex: searchRegex },
    })),
  };

  const rawResults = await resource.model
    .find(searchConditions)
    .select(resource.projectFields)
    .populate(resource.populate || [])
    .exec();

  const enrichedResults = await attachMaterialPrices(rawResults, {
    currency,
    region,
    date: new Date(),
  });

  let flatResults = enrichedResults.map((item) => resource.transform(item));

  // 🔍 Fuzzy correction with Fuse.js
  const fuse = new Fuse(flatResults, {
    keys: ['title', 'description'],
    threshold: 0.4,
  });

  flatResults = fuse.search(search).map((r) => r.item);

  // 🗂 Sort by createdAt
  flatResults.sort((a, b) => {
    return sort.startsWith('-')
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  const paginatedResults = flatResults.slice(skip, skip + limit);
  const metadata = {
    totalResults: flatResults.length,
    currentPage: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(flatResults.length / limit),
    hasNextPage: skip + limit < flatResults.length,
    hasPrevPage: page > 1,
  };

  return { results: paginatedResults, metadata };
};
// export const globalSearch = async (query) => {
//   const {
//     search,
//     resourceType,
//     page = 1,
//     limit = 12,
//     sort = '-createdAt',
//   } = query;

//   if (!search) {
//     throw new Error('Search query is required.');
//   }

//   const skip = (page - 1) * limit;
//   const searchRegex = new RegExp(search, 'i');

//   const resourcesToSearch = resourceType
//     ? searchResources.filter((r) => r.type === resourceType)
//     : searchResources;

//   const allResultsPromises = resourcesToSearch.map(async (resource) => {
//     const searchConditions = {
//       $or: resource.searchableFields.map((field) => ({
//         [field]: { $regex: searchRegex },
//       })),
//     };

//     const results = await resource.model
//       .find(searchConditions)
//       .select(resource.projectFields)
//       .populate(resource.populate || [])
//       .exec(); // Don't use `.lean()` — we need to call `.toObject()` inside `attachMaterialPrices`

//     let enrichedResults = results;
//     if (resource.type === 'material') {
//       enrichedResults = await attachMaterialPrices(results, {
//         currency: query.currency || 'NGN',
//         region: query.region || null,
//         date: new Date(),
//       });
//     }

//     return enrichedResults.map((item) => resource.transform(item));
//   });

//   const allResultsArrays = await Promise.all(allResultsPromises);
//   let flatResults = allResultsArrays.flat();

//   // 🧠 Typo Correction (Fuzzy Match)
//   const fuse = new Fuse(flatResults, {
//     keys: ['title', 'description'],
//     threshold: 0.4, // Controls fuzzy sensitivity (lower = stricter match)
//   });

//   flatResults = fuse.search(search).map((result) => result.item);

//   // 🗂 Global sorting
//   flatResults.sort((a, b) => {
//     if (sort.startsWith('-')) {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     } else {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     }
//   });

//   const paginatedResults = flatResults.slice(skip, skip + limit);

//   const metadata = {
//     totalResults: flatResults.length,
//     currentPage: Number(page),
//     limit: Number(limit),
//     totalPages: Math.ceil(flatResults.length / limit),
//     hasNextPage: skip + limit < flatResults.length,
//     hasPrevPage: page > 1,
//   };

//   return { results: paginatedResults, metadata };
// };

export const getAutoCompleteSuggestions = async (searchQuery) => {
  if (!searchQuery) return [];

  const searchRegex = new RegExp(searchQuery, 'i');

  // Material suggestions
  const materialMatches = await AcademicMaterial.find({
    title: { $regex: searchRegex },
  })
    .select('title slug')
    .limit(5)
    .lean();

  // Shop suggestions
  const shopMatches = await Shop.find({
    businessName: { $regex: searchRegex },
  })
    .select('businessName slug')
    .limit(5)
    .lean();

  // Category suggestions
  const categoryMatches = await Category.find({
    name: { $regex: searchRegex },
  })
    .select('name slug')
    .limit(5)
    .lean();

  // Compose unified suggestions array with type, slug, and title
  const suggestions = [
    ...materialMatches.map((m) => ({
      title: m.title,
      type: 'material',
      slug: m.slug,
    })),
    ...shopMatches.map((s) => ({
      title: s.businessName,
      type: 'shop',
      slug: s.slug,
    })),
    ...categoryMatches.map((c) => ({
      title: c.name,
      type: 'category',
      slug: c.slug,
    })),
  ];

  // Optionally deduplicate by title if needed
  const seen = new Set();
  const uniqueSuggestions = suggestions.filter((s) => {
    if (seen.has(s.title)) return false;
    seen.add(s.title);
    return true;
  });

  return uniqueSuggestions.slice(0, 8); // Top 8 suggestions
};

// export const getAutoCompleteSuggestions = async (searchQuery) => {
//   if (!searchQuery) return [];

//   const searchRegex = new RegExp(searchQuery, 'i');

//   // Collect possible matches
//   const materialMatches = await AcademicMaterial.find({
//     title: { $regex: searchRegex },
//   })
//     .select('title')
//     .limit(5)
//     .lean();

//   const shopMatches = await Shop.find({ businessName: { $regex: searchRegex } })
//     .select('businessName')
//     .limit(5)
//     .lean();

//   const categoryMatches = await Category.find({ name: { $regex: searchRegex } })
//     .select('name')
//     .limit(5)
//     .lean();

//   const suggestions = [
//     ...materialMatches.map((m) => m.title),
//     ...shopMatches.map((s) => s.businessName),
//     ...categoryMatches.map((c) => c.name),
//   ];

//   const uniqueSuggestions = [...new Set(suggestions)];

//   return uniqueSuggestions.slice(0, 8); // Only return top 8 suggestions
// };

export const getRelatedSearchSuggestions = async (searchQuery) => {
  if (!searchQuery) return [];

  const searchRegex = new RegExp(searchQuery, 'i');

  // Search titles and names similar to the query
  const materialTitles = await AcademicMaterial.find({
    title: { $regex: searchRegex },
  })
    .select('title')
    .limit(5)
    .lean();

  const shopNames = await Shop.find({ businessName: { $regex: searchRegex } })
    .select('businessName')
    .limit(5)
    .lean();

  const categoryNames = await Category.find({ name: { $regex: searchRegex } })
    .select('name')
    .limit(5)
    .lean();

  const suggestions = [
    ...materialTitles.map((m) => m.title),
    ...shopNames.map((s) => s.businessName),
    ...categoryNames.map((c) => c.name),
  ];

  // Optional: Remove duplicates
  const uniqueSuggestions = [...new Set(suggestions)];

  return uniqueSuggestions.slice(0, 8); // Return top 8 related searches
};
