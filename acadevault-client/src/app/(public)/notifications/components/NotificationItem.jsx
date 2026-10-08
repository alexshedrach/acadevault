export default function NotificationItem({ notification }) {
  return (
    <div
      className={`p-4 border rounded-md flex justify-between items-start ${
        notification.isRead ? "bg-gray-50" : "bg-yellow-50"
      }`}
    >
      <div>
        <p className="text-gray-700 text-sm">{notification.message}</p>
        <span className="text-gray-400 text-xs">{notification.time}</span>
      </div>
      {!notification.isRead && (
        <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
          New
        </span>
      )}
    </div>
  );
}
