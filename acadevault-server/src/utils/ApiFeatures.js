class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.paginationMetadata = {};
  }

  // Add pagination
  async pagination(perPage = 10) {
    const page = Math.max(parseInt(this.queryString.page, 10) || 1, 1);
    const limit = Math.max(parseInt(this.queryString.limit, 10) || perPage, 1);
    // console.log('Applying limit in pagination:', limit); // ✅ Debugging

    const skip = (page - 1) * limit;
    const count = await this.query.clone().countDocuments();

    this.paginationMetadata = {
      currentPage: page,
      limit, // ✅ Ensure limit is correctly stored
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
    };

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  // Add filtering

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    // Replace MongoDB operators correctly
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in|ne|nin|exists|regex)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Add searching

  search(searchableFields) {
    const searchValue = this.queryString?.search?.trim();
    if (!searchValue) return this;

    // Use MongoDB's full-text search when applicable
    // if (
    //   searchableFields.includes('name') ||
    //   searchableFields.includes('description')
    // ) {
    //   this.query = this.query.find({ $text: { $search: searchValue } });
    // } else {
    //   // Fallback to regex-based search for non-text indexed fields
    //   const searchConditions = searchableFields.map((field) => ({
    //     [field]: { $regex: new RegExp(searchValue, 'i') },
    //   }));
    //   this.query = this.query.find({ $or: searchConditions });
    // }
    const indexedFields = ['name', 'description']; // Define your indexed fields
    const isTextSearchApplicable = searchableFields.every((field) =>
      indexedFields.includes(field),
    );

    if (isTextSearchApplicable) {
      this.query = this.query.find({ $text: { $search: searchValue } });
    } else {
      const searchConditions = searchableFields.map((field) => ({
        [field]: { $regex: new RegExp(searchValue, 'i') },
      }));
      this.query = this.query.find({ $or: searchConditions });
    }

    return this;
  }

  // Add sorting
  sort() {
    const { sort } = this.queryString;

    if (sort) {
      const validSortFields = [
        'name',
        'createdAt',
        'updatedAt',
        'views',
        'price',
        'averageRating',
      ];
      const sortFields = sort
        .split(',')
        .filter((field) => validSortFields.includes(field.replace('-', '')))
        .map((field) => field) // MongoDB uses "-" for desc, so just pass the field as-is
        .join(' ');

      this.query = this.query.sort(sortFields || '-createdAt');
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // sort() {
  //   const { sort } = this.queryString;

  //   if (sort) {
  //     // Define allowed sorting fields
  //     const validSortFields = ['name', 'createdAt', 'updatedAt'];
  //    // Default sorting by newest first
  //     const sortFields = sort
  //       .split(',')
  //       .filter((field) => validSortFields.includes(field.replace('-', '')))
  //       .map((field) => (field.startsWith('-') ? `-${field.slice(1)}` : field))
  //       .join(' ');

  //     this.query = this.query.sort(sortFields || '-createdAt'); // Default to newest first
  //   } else {
  //     this.query = this.query.sort('-createdAt');
  //   }

  //   return this;
  // }

  // Add field limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }
}

export default ApiFeatures;
