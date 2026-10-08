import {
  // FILE_TYPE_EXT,
  MATERIAL_FILE_TYPE_MAP,
  MATERIAL_TYPE_KEY_MAP,
} from '../constants/enums.js';

export const fileUrlValidators = (materialType) => {
  const normalizedTypeKey = MATERIAL_TYPE_KEY_MAP[materialType] || materialType;
  const validFileTypes = MATERIAL_FILE_TYPE_MAP[normalizedTypeKey] || [];

  return [
    {
      validator: function (value) {
        if (this.storageType === 'local') return true;
        if (!value) return true;

        const urlRegex =
          /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlRegex.test(value);
      },
      message: 'Invalid URL format.',
    },
    {
      validator: function (value) {
        if (!validFileTypes.length) {
          throw new Error(`Material type '${materialType}' is not supported.`);
        }

        const fileExtension = value.split('.').pop().toLowerCase();
        return validFileTypes.includes(fileExtension);
      },
      message: `Invalid file type for '${materialType}'. Allowed types: ${validFileTypes.join(', ')}`,
    },
  ];
};
