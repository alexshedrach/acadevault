import path from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';

/**
 * TemplateRenderer loads and renders templates (HTML or text) with advanced features:
 * - In-memory caching of raw and compiled templates
 * - Handlebars support for loops, conditionals, and helpers
 * - Fallback to `.txt` templates for SMS or plain text channels
 */
class TemplateRenderer {
  /**
   * Cache stores both raw and compiled templates:
   * {
   *   '<folder>/<templateName>.<ext>': {
   *     raw: string,
   *     compiled: HandlebarsTemplateDelegate,
   *     lastModified: number
   *   }
   * }
   */
  static _cache = new Map();

  /**
   * Render a template by name, using Handlebars if available.
   * @param {string} templateName - Base filename without extension
   * @param {Object} context - Key-value data for template
   * @param {string} folder - Subfolder under src/templates (default 'emails')
   * @param {string[]} extensions - List of extensions to try (default ['html', 'txt'])
   * @returns {Promise<string>} Rendered string
   */
  static async render(templateName, context = {}, folder = 'emails', extensions = ['html', 'txt']) {
    for (const ext of extensions) {
      const key = `${folder}/${templateName}.${ext}`;
      try {
        const filePath = path.resolve('src/templates', folder, `${templateName}.${ext}`);
        await this.refreshCacheIfChanged(key, filePath);

        const { compiled } = this._cache.get(key);
        return compiled(context);
      } catch (err) {
        // If file not found, try next extension
        if (err.code === 'ENOENT') continue;
        logger.error('TemplateRenderer error', {
          template: key,
          error: err.message,
        });
        throw new AppError(
          `Template render failed for '${templateName}.${ext}': ${err.message}`,
          500
        );
      }
    }
    logger.error('Template not found', {
      templateName,
      folder,
      extensions: extensions.join(', '),
    });
    throw new AppError(
      `Template '${templateName}' not found in '${folder}' with any of extensions ${extensions.join(', ')}`,
      404
    );
  }

  /**
   * Check if template file has changed and refresh cache if needed.
   * @param {string} key - Cache key (folder/templateName.ext)
   * @param {string} filePath - Absolute file path
   */
  static async refreshCacheIfChanged(key, filePath) {
    try {
      const stats = await fs.stat(filePath);
      const cached = this._cache.get(key);
      if (!cached || cached.lastModified !== stats.mtimeMs) {
        const raw = await fs.readFile(filePath, 'utf-8');
        let compiled;
        if (key.endsWith('.html') || key.endsWith('.txt') || key.endsWith('.hbs')) {
          if (!this._helpersRegistered) {
            Handlebars.registerHelper('if_eq', (a, b, opts) =>
              a === b ? opts.fn(this) : opts.inverse(this)
            );
            Handlebars.registerHelper('formatDate', (date, fmt) => {
              return new Date(date).toLocaleDateString();
            });
            this._helpersRegistered = true;
          }
          compiled = Handlebars.compile(raw);
        } else {
          compiled = (context) => raw.replace(/{{(\w+)}}/g, (_, k) => context[k] || '');
        }
        this._cache.set(key, { raw, compiled, lastModified: stats.mtimeMs });
        logger.debug('Template cache updated', { template: key, lastModified: stats.mtimeMs });
      }
    } catch (err) {
      logger.error('Failed to refresh template cache', { template: key, error: err.message });
      throw err;
    }
  }

  /**
   * Clear all cached templates (raw & compiled)
   */
  static clearCache() {
    this._cache.clear();
    logger.info('TemplateRenderer cache cleared');
  }
}

export default TemplateRenderer;
// import path from 'path';
// import fs from 'fs/promises';
// import AppError from '@/utils/HandleAppErrors.js';
// import { logger } from '@/utils/logger.js';

// /**
//  * TemplateRenderer loads and renders HTML/text templates with simple {{key}} replacements.
//  * Caches raw templates in memory to reduce file I/O on repeated renders.
//  */
// class TemplateRenderer {
//   // In-memory cache: { '<folder>/<templateName>': rawTemplateString }
//   static _cache = new Map();

//   /**
//    * Render a template by name, replacing all {{key}} placeholders.
//    * @param {string} templateName - Name of the template file (no extension)
//    * @param {Object} context - Key-value map of placeholders to values
//    * @param {string} folder - Subfolder under src/templates (default: 'emails')
//    * @returns {Promise<string>} - Rendered HTML/text string
//    * @throws {AppError} - If file read or rendering fails
//    */
//   static async render(templateName, context = {}, folder = 'emails') {
//     const cacheKey = `${folder}/${templateName}`;

//     try {
//       // Load and cache raw template if not already in memory
//       if (!this._cache.has(cacheKey)) {
//         const templatePath = path.resolve('src/templates', folder, `${templateName}.html`);
//         const raw = await fs.readFile(templatePath, 'utf-8');
//         this._cache.set(cacheKey, raw);
//       }

//       // Clone the template to avoid mutating the cache
//       let rendered = this._cache.get(cacheKey);

//       // Perform simple placeholder replacement
//       for (const [key, value] of Object.entries(context)) {
//         const regex = new RegExp(`{{${key}}}`, 'g');
//         rendered = rendered.replace(regex, String(value));
//       }

//       return rendered;
//     } catch (err) {
//       logger.error('TemplateRenderer error', {
//         template: templateName,
//         folder,
//         error: err.message,
//       });
//       throw new AppError(`Template render failed: ${err.message}`, 500);
//     }
//   }

//   /**
//    * Clear the in-memory cache (useful for development or testing)
//    */
//   static clearCache() {
//     this._cache.clear();
//     logger.info('TemplateRenderer cache cleared');
//   }
// }

// export default TemplateRenderer;
