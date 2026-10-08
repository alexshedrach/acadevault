"use client";

import React from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/**
 * MyAnalyticsChart – A responsive line chart showing "Materials Completed Over Time".
 *
 * Props:
 * - data: Array<{ month: string; completed: number }>
 *     e.g. [
 *       { month: "Jan 2025", completed: 12 },
 *       { month: "Feb 2025", completed: 18 },
 *       // ...
 *     ]
 */
export default function MyAnalyticsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

        {/* X‐axis: Month labels */}
        <XAxis
          dataKey="month"
          tick={{ fill: "#4a5568", fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#cbd5e0" }}
        />

        {/* Y‐axis: Number of completed materials */}
        <YAxis
          tick={{ fill: "#4a5568", fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#cbd5e0" }}
          allowDecimals={false}
        />

        {/* Tooltip on hover */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#f7fafc",
            border: "1px solid #cbd5e0",
          }}
          labelStyle={{ fontWeight: "bold" }}
        />

        {/* Legend at the top */}
        <Legend verticalAlign="top" height={36} />

        {/* Line for “Completed Materials” */}
        <Line
          type="monotone"
          dataKey="completed"
          name="Materials Completed"
          stroke="#4f46e5" // Indigo‐600
          strokeWidth={2}
          dot={{ r: 4, fill: "#4f46e5", stroke: "#fff", strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

MyAnalyticsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      completed: PropTypes.number.isRequired,
    })
  ).isRequired,
};
