export const CURRENCIES = Object.freeze([
  'USD', // United States Dollar
  'EUR', // Euro
  'GBP', // British Pound
  'NGN', // Nigerian Naira
  'KES', // Kenyan Shilling
  'GHS', // Ghanaian Cedi
  'ZAR', // South African Rand
  'INR', // Indian Rupee
  'JPY', // Japanese Yen
  'CNY', // Chinese Yuan
  'AUD', // Australian Dollar
  'CAD', // Canadian Dollar
  'SGD', // Singapore Dollar
  'AED', // UAE Dirham
  'BRL', // Brazilian Real
  'MXN', // Mexican Peso
]);

// constants/enums.js
// export const CURRENCIES = Object.freeze({
//   NGN: 'NGN',
//   USD: 'USD',
//   EUR: 'EUR',
//   GBP: 'GBP',
//   KES: 'KES',
//   GHS: 'GHS',
//   ZAR: 'ZAR',
//   INR: 'INR',
//   JPY: 'JPY',
//   CNY: 'CNY',
//   AUD: 'AUD',
//   CAD: 'CAD',
//   SGD: 'SGD',
//   AED: 'AED',
//   BRL: 'BRL',
//   MXN: 'MXN',
// });

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  NGN: '₦',
  KES: 'KSh',
  GHS: '₵',
  ZAR: 'R',
  INR: '₹',
  JPY: '¥',
  CNY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  AED: 'د.إ',
  BRL: 'R$',
  MXN: 'Mex$',
};

// Order Statuses
export const ORDER_STATUS = Object.freeze({
  PENDING: 'Pending', // Order placed but not yet paid
  PAID: 'Paid', // Payment received but not yet shipped
  SHIPPED: 'Shipped', // Order shipped but not delivered
  COMPLETED: 'Completed', // Order delivered and finalized
  CANCELED: 'Canceled', // Order canceled before completion
  REFUNDED: 'Refunded', // Payment refunded after completion or cancellation
});

// Cart Statuses
export const CART_STATUS = Object.freeze({
  ACTIVE: 'Active', // Cart is active and the user is still adding items
  COMPLETED: 'Completed', // Cart has been checked out and the order is placed
  ABANDONED: 'Abandoned', // Cart was created but the user didn't complete the checkout process
  PENDING_PAYMENT: 'Pending Payment', // Cart checkout is initiated but waiting for payment confirmation
  EXPIRED: 'Expired', // Cart has expired, no longer valid (user did not checkout in time)
  EMPTY: 'Empty',
  PENDING_CHECKOUT: 'Pending Checkout',
  CHECKED_OUT: 'Checkout',
});

// Transaction Types
export const TRANSACTION_TYPES = Object.freeze({
  PAYMENT: 'Payment', // Payment made for an order
  REFUND: 'Refund', // Refund issued to the customer
  PURCHASE: 'Purchase', // Purchase-related transaction
  WITHDRAWAL: 'Withdrawal', // Withdrawal of funds from the system
  DEPOSIT: 'Deposit', // Deposit of funds into the system
  SUBSCRIPTION: 'Subscription', // Subscription-based payments
  AFFILIATE_EARNING: 'AffiliateEarning', // Rewards for affiliate referrals
  REFERRAL_COMMISSION: 'ReferralCommission', // Commission earned or distributed
});

// Transaction Statuses
export const TRANSACTION_STATUSES = Object.freeze({
  PENDING: 'Pending', // Transaction is pending processing
  PROCESSING: 'Processing', // Transaction is being processed
  COMPLETED: 'Completed', // Transaction completed successfully
  CANCELED: 'Canceled', // Transaction canceled before completion
  REFUNDED: 'Refunded', // Funds refunded for the transaction
  FAILED: 'Failed', // Transaction failed during processing
  PARTIALLY_PAID: 'Partially Paid',
});

export const SHIPPING_METHODS = Object.freeze([
  'standard', // 3–5 business days
  'express', // 1–2 business days
  'overnight', // next-day delivery
  'pickup-station', // Pickup from a logistics hub
]);

export const DELIVERY_METHODS = Object.freeze({
  SHIPPING: 'Shipping',
  PICKUP: 'Pickup',
  DIGITAL: 'Digital',
  EMAIL: 'Email',
  IN_APP: 'InApp', // For digital materials accessed within your platform
});

export const FULFILLMENT_STATUS = Object.freeze({
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  FULFILLED: 'Fulfilled',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
  RETURNED: 'Returned',
});

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card', // Default card method via gateway
  BANK_TRANSFER: 'bank_transfer',
  PAYPAL: 'paypal',
  CRYPTO: 'crypto',
  CASH_ON_DELIVERY: 'cash_on_delivery',
  DIGITAL_WALLET: 'digital_wallet',
  MOBILE_MONEY: 'mobile_money',
  BNPL: 'bnpl',
  GIFT_CARD: 'gift_card',
  IN_APP_PAYMENT: 'in_app_payment',
};

export const PAYMENT_GATEWAYS = {
  STRIPE: 'Stripe',
  PAYPAL: 'PayPal',
  FLUTTERWAVE: 'Flutterwave',
  PAYSTACK: 'Paystack',
  CRYPTO: 'Crypto',
  BANK_TRANSFER: 'Bank Transfer',
};

// Payment Statuses
export const PAYMENT_STATUS = {
  PENDING: 'Pending',
  CAPTURED: 'Captured',
  CAPTURED_PARTIAL: 'Captured Partial',
  SUCCESS: 'Success',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
  CHARGEBACK: 'Chargeback',
  COMPLETED: 'Completed',
};

export const DISCOUNT_TYPES = Object.freeze({
  PERCENTAGE: 'Percentage', // e.g. 10% off
  FIXED: 'Fixed', // e.g. $5 or ₦500 off
  FREE_SHIPPING: 'Free Shipping', // e.g. free delivery on eligible orders
});

export const DISCOUNT_SCOPES = Object.freeze({
  SITE_WIDE: 'Site‑wide Discount',
  PRODUCT_SPECIFIC: 'Product‑specific Discount',
  CATEGORY_SPECIFIC: 'Category‑specific Discount',
  CART_TOTAL: 'Cart‑level Discount',
});

export const DISCOUNT_STATUSES = Object.freeze({
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  PENDING: 'Pending',
  DISABLED: 'Disabled',
});

export const TARGET_AUDIENCES = {
  ALL: 'All',
  NEW_USERS: 'NewUsers',
  RETURNING_USERS: 'ReturningUsers',
  PREMIUM_USERS: 'PremiumUsers',
};

// Refund-related constants
export const REFUND_STATUSES = {
  PENDING: 'Pending', // Refund is waiting to be processed
  APPROVED: 'Approved', // Refund has been approved
  REJECTED: 'Rejected', // Refund has been rejected
  COMPLETED: 'Completed', // Refund has been completed
};

export const REFUND_METHODS = {
  ORIGINAL_PAYMENT: 'Original Payment', // Refund to original payment method
  STORE_CREDIT: 'Store Credit', // Refund as store credit
  MANUAL: 'Manual', // Refund through manual methods (check, etc.)
};

export const REFUND_REASONS = {
  DAMAGED: 'Damaged', // Product is damaged
  NOT_AS_DESCRIBED: 'Not as Described', // Item was not as described
  WRONG_ITEM_SENT: 'Wrong Item Sent', // Wrong item was shipped
  CUSTOMER_REQUESTED: 'Customer Requested', // Customer simply changed mind
  OTHER: 'Other', // Other reasons not specified
};

// Address types (shipping, billing, etc.)
export const ADDRESS_TYPES = {
  SHIPPING: 'Shipping', // Shipping address for delivery
  BILLING: 'Billing', // Billing address for payment processing
  WORK: 'Work', // Work address
  GIFT: 'Gift', // Gift address for sending to others
  OTHER: 'Other', // Any other address type
};

// User roles with clear keys and values
export const USER_ROLES = Object.freeze({
  USER: 'User',
  SELLER: 'Seller',
  ADMIN: 'Admin',
  SUPPORT_AGENT: 'SupportAgent',
  AFFILIATE: 'Affiliate',
});

// Account statuses with clear keys and values
export const ACCOUNT_STATUSES = Object.freeze({
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  AWAY: 'Away',
  BUSY: 'Busy',
});

// Interest categories with clear keys and values
export const INTEREST_CATEGORIES = Object.freeze({
  TECHNOLOGY: 'Technology',
  HEALTH: 'Health',
  EDUCATION: 'Education',
  BUSINESS: 'Business',
  LIFESTYLE: 'Lifestyle',
  ARTS: 'Arts',
  SCIENCE: 'Science',
  ENVIRONMENT: 'Environment',
});

export const FOLLOW_STATUSES = Object.freeze({
  FOLLOW: 'Follow',
  UNFOLLOW: 'Unfollow',
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  BLOCKED: 'Blocked',
});

export const VALID_ENTITY_TYPES = Object.freeze({
  USER: 'User',
  SHOP: 'Shop',
  PAGE: 'Page',
  GROUP: 'Group',
  TOPIC: 'Topic',
});

export const SHOP_STATUSES = Object.freeze({
  PENDING: 'Pending', // Waiting for admin approval
  SUBMITTED: 'submitted',
  ACTIVE: 'Active', // Shop is live and operational
  SUSPENDED: 'Suspended', // Temporarily disabled by admin
  CLOSED: 'Closed', // Permanently shut down
  UNDER_REVIEW: 'Under Review', // Requires admin review (e.g., after complaints)
  REJECTED: 'Rejected', // Registration or reactivation rejected
});

export const SHOP_TYPES = Object.freeze({
  RETAIL: 'Retail', // Selling physical products directly to consumers
  DIGITAL: 'Digital', // Selling digital products (e.g., e-books, software)
  INSTITUTIONAL: 'Institutional',
  PUBLISHER: 'Publisher',
  MARKETPLACE: 'Marketplace',
  SERVICE: 'Service', // Providing services (e.g., consulting, repairs)
  WHOLESALE: 'Wholesale', // Selling in bulk to other businesses or retailers
  SUBSCRIPTION: 'Subscription', // Subscription-based business models (e.g., recurring services or products)
  AUCTION: 'Auction', // Auction-based sales (e.g., bidding system)
  CUSTOM: 'Custom', // Custom or bespoke products (e.g., handmade goods)
  GENERAL: 'General', // A shop that sells everything
});

export const ALLOWED_SOCIAL_PLATFORMS = Object.freeze({
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
});

// Social login providers as an array of options
export const SOCIAL_LOGIN_PROVIDERS = Object.freeze(['Google', 'Facebook', 'LinkedIn']);

// Enums for Academic Material
export const CATEGORY_TYPES = Object.freeze({
  GENERIC: 'Generic',
  ACADEMIC_DISCIPLINE: 'Academic Discipline', // Fields of study (e.g., Mathematics, Physics)
  DEPARTMENT: 'Department', // Fields of study (e.g., Mathematics, Physics)
  MATERIAL_TYPE: 'Material Type', // Categorizing by type of material (e.g., Book, Video)
  ACADEMIC_LEVEL: 'Academic Level', // Levels such as High School, Undergraduate, Postgraduate
  DEGREE_LEVEL: 'Degree Level',
  COURSE_PROGRAM: 'Course/Program', // Specific courses or educational programs
  USAGE_PURPOSE: 'Usage Purpose', // Study, Research, Teaching, etc.
  FORMAT: 'Format', // Digital, Physical, Interactive
  SUBJECT_TAGS: 'Subject Tags', // Keywords for cross-referencing
  SPECIALIZED_CATEGORIES: 'Specialized Categories', // Niche topics (e.g., Artificial Intelligence, Data Science)
  INDUSTRY_APPLICATION: 'Industry Application', // Mapping to real-world industries (e.g., Healthcare, Engineering)
  SKILL_LEVEL: 'Skill Level', // Beginner, Intermediate, Advanced
  EXAM_PREPARATION: 'Exam Preparation', // Preparation resources for specific exams (e.g., SAT, GRE)
  PEDAGOGICAL_METHOD: 'Pedagogical Method', // Learning approaches (e.g., Problem-Based Learning, Experiential Learning)
});

export const ACADEMIC_LEVELS = {
  UNDERGRADUATE: 'Undergraduate',
  POSTGRADUATE: 'Postgraduate',
  HIGH_SCHOOL: 'High School',
  DOCTORATE: 'Doctorate',
  PROFESSIONAL_CERTIFICATIONS: 'Professional Certifications',
};

export const ACADEMIC_DEGREES = {
  BSC: { name: 'B.Sc', level: ACADEMIC_LEVELS.UNDERGRADUATE },
  HND: { name: 'HND', level: ACADEMIC_LEVELS.UNDERGRADUATE },
  ND: { name: 'ND', level: ACADEMIC_LEVELS.UNDERGRADUATE },
  NCE: { name: 'NCE', level: ACADEMIC_LEVELS.UNDERGRADUATE },
  BA: { name: 'B.A', level: ACADEMIC_LEVELS.UNDERGRADUATE },
  BENG: { name: 'B.Eng', level: ACADEMIC_LEVELS.UNDERGRADUATE },
  BED: { name: 'B.Ed', level: ACADEMIC_LEVELS.UNDERGRADUATE },
  LLB: { name: 'LL.B', level: ACADEMIC_LEVELS.UNDERGRADUATE },

  MSC: { name: 'M.Sc', level: ACADEMIC_LEVELS.POSTGRADUATE },
  PGD: { name: 'PGD', level: ACADEMIC_LEVELS.POSTGRADUATE },
  MBA: { name: 'MBA', level: ACADEMIC_LEVELS.POSTGRADUATE },

  PHD: { name: 'Ph.D', level: ACADEMIC_LEVELS.DOCTORATE },
};

// import { CATEGORY_TYPES } from "@acadevault/shared/constants/enum";

export const DIGITAL_MATERIAL_TYPES = Object.freeze({
  PROJECT_REPORT: 'Project Report',
  EXAM_TOKEN: 'Exam Token & Pin',
  JOURNAL: 'Journal', // Digital PDFs or printed journals
  RESEARCH_PAPER: 'Research Paper', // Scholarly articles (PDF or print)
  THESIS: 'Thesis', // Academic research papers (PDF or printed)
  DISSERTATION: 'Dissertation', // Advanced research documents
  CASE_STUDY: 'Case Study', // Analysis documents (PDF or printed)
  BUSINESS_PLAN: 'Business Plan', // Business documents (PDF or printed)
  PROPOSAL: 'Proposal', // Research or business proposals
  TERM_PAPER: 'Term Paper', // Academic papers written as coursework
  ASSIGNMENT: 'Assignment', // Exercises or self-assessment tasks
  PAST_QUESTION: 'Past Question', // Exam questions (PDF or printed)
  HANDOUT: 'Handout', // Lecture handouts (PDF or printed)
  SEMINAR: 'Seminar', // Printed or recorded seminar materials
  EBOOK: 'Ebook', // Digital books (PDFs, ePub, etc.)
  VIDEO_TUTORIAL: 'Video Tutorial', // Video-based lessons
  AUDIO: 'Audio', // Podcasts, audiobooks
  ONLINE_COURSE: 'Online Course', // Structured online courses
  WEBINAR: 'Webinar', // Recorded or live webinars
  DATASET: 'Dataset', // Data collections for research or analysis
  SOFTWARE: 'Academic Software', // Educational software and tools
  SOURCE_CODE: 'Source Code',
  PRESENTATION: 'Presentation', // Slide decks (PowerPoint, Keynote, etc.)
  CERTIFICATION: 'Certification', // Digital course certifications
  LECTURE_NOTES: 'Lecture Note', // Notes from lectures
});

export const PHYSICAL_MATERIAL_TYPES = Object.freeze({
  BOOK: 'Book', // Traditional printed books
  LAB_MANUAL: 'Lab Manual', // Printed experiment guides
  POSTER: 'Poster', // Wall posters for educational purposes
  STUDY_KIT: 'Study Kit', // Bundled resources for practical learning
  WORKBOOK: 'Workbook', // Practice books for exercises
  PRINTED_MAP: 'Printed Map', // Foldable or laminated maps
  FLASHCARDS: 'Flashcards', // Tangible study aids
});

export const HYBRID_MATERIAL_TYPES = Object.freeze({
  VIDEO_TUTORIAL: 'Video Tutorial', // Video-based lessons
  JOURNAL: 'Journal', // Digital PDFs or printed journals
  RESEARCH_PAPER: 'Research Paper', // Scholarly articles (PDF or print)
  THESIS: 'Thesis', // Academic research papers (PDF or printed)
  DISSERTATION: 'Dissertation', // Advanced research documents
  CASE_STUDY: 'Case Study', // Analysis documents (PDF or printed)
  BUSINESS_PLAN: 'Business Plan', // Business documents (PDF or printed)
  PROPOSAL: 'Proposal', // Research or business proposals
  TERM_PAPER: 'Term Paper', // Academic papers written as coursework
  ASSIGNMENT: 'Assignment', // Exercises or self-assessment tasks
  PAST_QUESTION: 'Past Question', // Exam questions (PDF or printed)
  HANDOUT: 'Handout', // Lecture handouts (PDF or printed)
  SEMINAR: 'Seminar', // Printed or recorded seminar materials
  MAP: 'Map', // Printable or interactive digital maps
});

// 🔁 Map human-friendly material types to keys in MATERIAL_FILE_TYPE_MAP
export const MATERIAL_TYPE_KEY_MAP = {
  'Project Report': 'project_report',
  'Exam Token & Pin': 'epins',
  Journal: 'journal',
  'Research Paper': 'research_paper',
  Thesis: 'thesis',
  Dissertation: 'dissertation',
  'Case Study': 'case_study',
  'Business Plan': 'business_plan',
  Proposal: 'proposal',
  'Term Paper': 'term_paper',
  Assignment: 'assignment',
  'Past Question': 'past_question',
  Handout: 'lecture_notes',
  Seminar: 'seminar',
  Ebook: 'ebook',
  'Video Tutorial': 'tutorial',
  Audio: 'audio',
  'Online Course': 'course',
  Webinar: 'webinar',
  Dataset: 'dataset',
  Software: 'software',
  'Source Code': 'source_code',
  Presentation: 'presentation',
  Certification: 'certification',
  'Lecture Note': 'lecture_notes',
  Map: 'infographic',
};

export const TYPES_REQUIRING_PUBLICATION = [
  'ebook',
  'research_paper',
  'journal',
  'thesis',
  'dissertation',
  // 'project',
  'course',
  'webinar',
  'presentation',
];

export const FILE_TYPE_EXT = [
  'pdf',
  'docx',
  'doc',
  'epub',
  'mobi',
  'mp4',
  'mp3',
  'pptx',
  'ppt',
  'html',
  'csv',
  'xls',
  'xlsx',
  'json',
  'xml',
  'jpg',
  'jpeg',
  'webp',
  'png',
  'svg',
  'bmp',
  'zip',
  'tar',
  'exe',
  'dmg',
  'avi',
  'mov',
];

// Material types and associated file types (real-world use case)
export const MATERIAL_FILE_TYPE_MAP = {
  book: ['pdf', 'epub', 'docx', 'mobi'], // Books are typically in pdf, epub, docx formats, and sometimes mobi (for Kindle)
  project: ['pdf', 'docx'],
  thesis: ['pdf', 'epub', 'docx', 'odt'], // Theses are often in pdf, docx, and sometimes open document formats like odt
  dissertation: ['pdf', 'epub', 'docx', 'odt'], // Same as thesis
  research_paper: ['pdf', 'epub', 'docx', 'txt'], // Scholarly papers in pdf, docx, and text formats
  lecture_notes: ['pdf', 'docx', 'pptx', 'txt'], // Lecture notes often in pdf, docx, pptx (slides), or text
  journal: ['pdf', 'epub', 'docx', 'html'], // Journals can be in pdf, epub, docx, or sometimes web-based formats like HTML
  case_study: ['pdf', 'docx', 'pptx', 'html'], // Case studies in pdf, docx, pptx for presentations, or html for web versions
  feasibility_study: ['pdf', 'docx', 'pptx'], // Feasibility studies are commonly in pdf, docx, or pptx for presentations
  proposal: ['pdf', 'docx', 'pptx'], // Proposals are often in pdf, docx, or pptx
  course: ['pdf', 'epub', 'docx', 'mp4', 'pptx', 'html'], // Courses often include multiple formats like pdf, epub, mp4 videos, pptx slides, and html for web-based content
  video: ['mp4', 'avi', 'mov'], // Videos are typically in mp4, avi, or mov formats
  tutorial: ['mp4', 'pdf', 'epub', 'docx'], // Tutorials include videos (mp4), guides (pdf, docx), or ebooks (epub)
  audio: ['mp3', 'wav', 'ogg'], // Audio files are usually mp3, wav, or ogg formats
  software: ['exe', 'zip', 'tar', 'dmg'], // Software is typically packaged in executable formats (exe, dmg for macOS, zip/tar for archiving)
  template: ['docx', 'pptx', 'xls', 'zip'], // Templates often come as docx, pptx, xls (spreadsheet), or zipped files containing multiple templates
  presentation: ['pptx', 'pdf', 'key', 'odp'], // Presentations are typically in pptx, pdf, key (Keynote), or odp (Open Document Presentation)
  infographic: ['png', 'jpg', 'pdf', 'svg'], // Infographics are usually images (png, jpg, svg) or in pdf format
  assignment: ['pdf', 'docx', 'txt'], // Assignments are commonly in pdf, docx, or plain text format
  seminar: ['mp4', 'pdf', 'pptx', 'html'], // Seminar content is often available as videos (mp4), slides (pptx), and notes (pdf, html)
  term_paper: ['pdf', 'docx', 'txt'], // Term papers are generally in pdf, docx, or txt formats
  past_question: ['pdf', 'docx', 'txt'], // Past questions are usually in pdf, docx, or txt
  epins: ['pdf', 'docx', 'epub'], // Epins could be digital content like guides or instructional materials
  lab_manual: ['pdf', 'docx', 'pptx'], // Lab manuals are often in pdf, docx, or pptx for instructional content
  dataset: ['csv', 'xls', 'json', 'xml'], // Datasets are typically in formats like csv, xls, or json
  worksheet: ['pdf', 'docx', 'xls'], // Worksheets are commonly in pdf, docx, or xls formats
  webinar: ['mp4', 'pdf', 'pptx'], // Webinars are often recorded in video (mp4) and may have supporting slides (pdf, pptx)
  simulation: ['exe', 'swf', 'zip'], // Simulations could be executable files, flash (swf), or zipped versions containing interactive content
  ebook: ['pdf', 'epub', 'mobi'], // Ebooks generally in pdf, epub, or mobi for e-readers
  interactive_media: ['html', 'swf', 'mp4'], // Interactive media could be HTML-based, Flash, or videos
  certification: ['pdf', 'jpg', 'png'], // Certifications are often digital documents in pdf format or images (jpg, png)
};

// Define weighting for each factor
export const RANKING_WEIGHTS = {
  views: 0.3,
  downloads: 0.3,
  rating: 0.2,
  reviews: 0.2,
};

export const MATERIAL_FORMATS = ['digital', 'physical', 'hybrid'];

export const MATERIAL_STATUSES = [
  'draft',
  'submitted',
  'pending_review',
  'approved',
  'published',
  'rejected',
];

export const MATERIAL_LICENSES = Object.freeze([
  'standard_license', // Default license type for general usage
  'extended_license', // Allows extended usage (e.g., commercial use)
  'personal_use', // Restricted to personal use only
  'academic_license', // Specifically for academic purposes
  'creative_commons', // Broad Creative Commons licensing
  'open_source', // Free and open-source usage
  'proprietary_license', // Proprietary with restricted use
  'royalty_free', // No royalty payment required for usage
  'site_license', // Licensed for use across a single organization/site
  'multi_user_license', // Allows multiple users under the same license
  'educational_license', // For use in educational settings
  'non_commercial', // Usage is restricted to non-commercial purposes
  'public_domain', // No restrictions, material is in the public domain
]);
