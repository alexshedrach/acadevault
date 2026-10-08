"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Branding = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="relative w-[12rem] h-[3rem] flex items-center">
      <Link
        href="/"
        aria-label="AcadeVault Home"
        className="flex items-center group focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-sm"
      >
        {!logoError ? (
          <Image
            src="/images/acadevault-logo.png"
            alt="AcadeVault Logo"
            fill
            sizes="(max-width: 768px) 120px, 160px"
            priority
            onError={() => setLogoError(true)}
            className="object-contain w-[100px] h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          <span
            className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 
            bg-clip-text text-transparent animate-gradient-slow group-hover:scale-110 group-hover:drop-shadow-lg transition-transform"
          >
            Acade<span className="text-blue-600">Vault</span>
          </span>
        )}
      </Link>
    </div>
  );
};

export default Branding;
