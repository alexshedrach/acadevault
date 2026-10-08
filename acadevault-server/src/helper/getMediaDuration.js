import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

/**
 * Extract duration (in seconds) from audio/video buffer using ffmpeg
 * @param {Buffer} buffer - The media file buffer
 * @returns {Promise<number|null>} - Duration in seconds
 */
export const getMediaDuration = (buffer) => {
  return new Promise((resolve, reject) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    ffmpeg(readable).ffprobe((err, metadata) => {
      if (err) {
        return reject(err);
      }

      const duration = metadata?.format?.duration || null;
      resolve(duration);
    });
  });
};
