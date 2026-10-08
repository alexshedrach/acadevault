"use client";

import React from "react";
import BorderBottom from "../common/BorderBottom";
import Heading from "../common/Heading";
import Box from "../common/Box";


export default function OfflinePaymentOptions() {
  return (
    <div className="p-10 bg-gray-50 rounded-lg shadow-md mb-8">
      <p className="text-3xl font-medium text-gray-400 mb-4">Option 01</p>
      <BorderBottom>
        <Heading as="h4" variation="secondary">
          Bank Deposits, Mobile Transfers, ATM, Quick Teller &amp; e-transfers
          to any bank below.
        </Heading>
      </BorderBottom>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Box>
          <p>
            <span className="font-bold">Bank Name:</span> Zenith Bank Plc
          </p>
          <p>
            <span className="font-bold">Account Number:</span> 2375537037
          </p>
          <p>
            <span className="font-bold">Account Name:</span> PShop Ventures
          </p>
          <p>
            <span className="font-bold">Account Type:</span> Savings
          </p>
        </Box>
        <Box>
          <p>
            <span className="font-bold">Bank Name:</span> First Bank Nig. Plc
          </p>
          <p>
            <span className="font-bold">Account Number:</span> 3135396678
          </p>
          <p>
            <span className="font-bold">Account Name:</span> PShop Ventures
          </p>
          <p>
            <span className="font-bold">Account Type:</span> Savings
          </p>
        </Box>
        <Box>
          <p>
            <span className="font-bold">Bank Name:</span> United African Bank
            Plc
          </p>
          <p>
            <span className="font-bold">Account Number:</span> 2162954714
          </p>
          <p>
            <span className="font-bold">Account Name:</span> PShop Ventures
          </p>
          <p>
            <span className="font-bold">Account Type:</span> Savings
          </p>
        </Box>
        <Box>
          <p>
            <span className="font-bold">Bank Name:</span> Union Bank Nig. Plc
          </p>
          <p>
            <span className="font-bold">Account Number:</span> 0047004644
          </p>
          <p>
            <span className="font-bold">Account Name:</span> PShop Ventures
          </p>
          <p>
            <span className="font-bold">Account Type:</span> Savings
          </p>
        </Box>
      </div>
    </div>
  );
}
