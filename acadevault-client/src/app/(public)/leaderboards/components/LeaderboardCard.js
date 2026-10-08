import { Trophy, Users, DollarSign } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

export default function LeaderboardCard({ leader, rank }) {
  const { name, avatar, earnings, metric, metricLabel } = leader;

  const trophyColor =
    {
      1: "text-yellow-500",
      2: "text-gray-400",
      3: "text-yellow-700",
    }[rank] || "text-blue-500";

  return (
    <div
      className={clsx(
        "bg-white p-6 rounded-xl border shadow-sm transition transform hover:scale-[1.02]",
        rank <= 3 ? "ring-2 ring-blue-100" : "ring-1 ring-gray-200"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-indigo-200">
          <Image
            src={avatar || "/placeholder-avatar.png"}
            alt={name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">#{rank} in earnings</p>
        </div>
        {rank <= 3 && <Trophy className={`ml-auto w-6 h-6 ${trophyColor}`} />}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span>${earnings.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-blue-600" />
          <span>
            {metric} {metricLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
