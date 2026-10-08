import React from "react";
import { ShieldCheck, Lock, Star } from "lucide-react";

const TrustBadge = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6 text-center border border-gray-100">
      <div className="flex flex-col items-center gap-3">
        <ShieldCheck size={36} className="text-green-500" />
        <h3 className="text-lg font-semibold text-gray-800">
          Your Trust, Our Priority
        </h3>
        <p className="text-sm text-gray-600">
          AcadeVault guarantees originality, secure checkout, and 24/7 support.
        </p>

        <ul className="mt-3 text-sm text-gray-700 text-left space-y-2 w-full">
          <li className="flex items-center gap-2">
            <Lock size={16} className="text-blue-600" />
            SSL Secured Payments
          </li>
          <li className="flex items-center gap-2">
            <Star size={16} className="text-yellow-500" />
            100% Original Content
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-500" />
            Quality Checked by Experts
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrustBadge;
