export default function NotificationActions() {
  return (
    <div className="flex justify-end space-x-2">
      <button className="text-sm text-blue-600 hover:underline">
        Mark all as read
      </button>
      <button className="text-sm text-red-600 hover:underline">
        Clear all
      </button>
    </div>
  );
}
