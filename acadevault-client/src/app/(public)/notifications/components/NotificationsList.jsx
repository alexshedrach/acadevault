import NotificationItem from "./NotificationItem";
import NotificationsEmptyState from "./NotificationsEmptyState";
import NotificationActions from "./NotificationActions";

const dummyNotifications = [
  {
    id: "1",
    type: "Purchase",
    message: "Your order #2345 has been confirmed.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "Message",
    message: "New message from your seller.",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: "3",
    type: "Promotion",
    message: "Flash deal on Engineering projects, 50% off!",
    time: "3 days ago",
    isRead: false,
  },
];

export default function NotificationsList() {
  const hasNotifications = dummyNotifications.length > 0;

  return (
    <section className="space-y-6">
      <NotificationActions />

      {hasNotifications ? (
        <div className="space-y-4">
          {dummyNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <NotificationsEmptyState />
      )}
    </section>
  );
}
