export const NOTIFICATION_CHANNELS = Object.freeze({
  EMAIL: 'email',
  IN_APP: 'in-app',
  SMS: 'sms',
  PUSH: 'push',
  SYSTEM: 'system',
});

export const NOTIFICATION_STATUSES = Object.freeze({
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
});

export const NOTIFICATION_PRIORITIES = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
});

export const NOTIFICATION_TYPES = Object.freeze({
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',

  NEW_COMMENT: 'new_comment',
  MATERIAL_UPDATE: 'material_update',
  USER_ACTION: 'user_action',

  PAYMENT_ALERT: 'payment_alert',
  ORDER_CONFIRMATION: 'order_confirmation',
  REFUND_CONFIRMATION: 'refund_confirmation',

  SHOP_REGISTRATION: 'shop_registration',
  MATERIAL_APPROVAL: 'material_approval',
  VENDOR_SALE: 'vendor_sale',

  DIGITAL_DOWNLOAD: 'digital_download',
  AFFILIATE_COMMISSION: 'affiliate_commission',
});
