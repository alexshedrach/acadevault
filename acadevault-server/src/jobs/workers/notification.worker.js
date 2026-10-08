import { Worker } from 'bullmq';
import { NotificationService } from '../../services/notification/NotificationService.js';
import { logger } from '../../utils/logger.js';

export function startNotificationWorker(connection) {
  return new Worker(
    'notifications',
    async (job) => {
      const { notification } = job.data;
      try {
        await NotificationService.sendNotification(notification);
        logger.info(`✅ Notification sent: ${notification.notificationId}`);
      } catch (err) {
        logger.error(`❌ Failed to send notification ${notification.notificationId}`, err);
        throw err;
      }
    },
    {
      connection,
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
    }
  );
}
