import React from "react";
import { Eye, Download, Star, FilePlus2 } from "lucide-react";

export default function CategoryStats({ views, downloads, rating, newCount }) {
  const stats = [
    { label: "Views", value: views, icon: <Eye /> },
    { label: "Downloads", value: downloads, icon: <Download /> },
    { label: "Avg Rating", value: rating.toFixed(1), icon: <Star /> },
    { label: "New Materials", value: newCount, icon: <FilePlus2 /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      {stats.map(({ label, value, icon }) => (
        <div key={label} className="p-4 bg-muted rounded-lg">
          <div className="mx-auto mb-1">{icon}</div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      ))}
    </div>
  );
}
