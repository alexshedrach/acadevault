import { Clock, CheckCircle, XCircle, Circle } from "lucide-react";
import { useMemo } from "react";

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = (((hour + 11) % 12) + 1).toString().padStart(2, "0");
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

function isOpenNow(todayHours) {
  if (!todayHours) return false;
  const now = new Date();
  const [openH, openM] = todayHours.open.split(":").map(Number);
  const [closeH, closeM] = todayHours.close.split(":").map(Number);

  const openTime = new Date(now);
  openTime.setHours(openH, openM, 0, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeH, closeM, 0, 0);

  // Closed all day
  if (todayHours.open === "00:00" && todayHours.close === "00:00") return false;

  return now >= openTime && now <= closeTime;
}

export default function WorkingHoursSection({ workingHours = [] }) {
  const today = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date()
    );
  }, []);

  const todayHours = workingHours.find(
    (item) => item.day.toLowerCase() === today.toLowerCase()
  );
  const isCurrentlyOpen = isOpenNow(todayHours);

  if (!workingHours.length) return null;

  return (
    <section
      className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white"
      aria-labelledby="working-hours-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          id="working-hours-heading"
          className="text-lg font-semibold text-gray-800 flex items-center gap-2"
        >
          <Clock className="w-5 h-5 text-blue-500" />
          Working Hours
        </h2>
        <span
          className={`text-sm px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
            isCurrentlyOpen
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <Circle
            className={`w-3 h-3 ${
              isCurrentlyOpen ? "text-green-500" : "text-red-500"
            }`}
          />
          {isCurrentlyOpen ? "Open now" : "Closed"}
        </span>
      </div>

      <ul className="space-y-2" role="list">
        {workingHours.map(({ day, open, close }) => {
          const isToday = day.toLowerCase() === today.toLowerCase();
          const isClosed = open === "00:00" && close === "00:00";

          return (
            <li
              key={day}
              className={`flex items-center justify-between px-2 py-1 rounded ${
                isToday
                  ? "bg-blue-50 font-semibold text-blue-900"
                  : "text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                {isClosed ? (
                  <XCircle className="w-4 h-4 text-red-500" aria-hidden />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500" aria-hidden />
                )}
                {day}
              </span>
              <span>
                {isClosed
                  ? "Closed"
                  : `${formatTime(open)} – ${formatTime(close)}`}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
