"use client";

import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Task = {
  _id: string;
  status: string;
  priority?: string;
};

type Props = {
  tasks: Task[];
};

export default function AnalyticsChart({
  tasks,
}: Props) {
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const high = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const medium = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const low = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const statusData = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];

  const priorityData = [
    {
      name: "High",
      value: high,
    },
    {
      name: "Medium",
      value: medium,
    },
    {
      name: "Low",
      value: low,
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
      {/* BAR CHART */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
        className="app-card p-4 sm:p-6 rounded-2xl transition-all duration-500 shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Task Status Overview
          </h2>

          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
        </div>

        <div className="w-full min-w-0 h-[250px] sm:h-[300px]">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={statusData}>
              <XAxis
                dataKey="name"
                stroke="var(--text-muted)"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                stroke="var(--text-muted)"
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor:
                    "var(--bg-card)",
                  border:
                    "1px solid var(--border-main)",
                  borderRadius: "12px",
                  color:
                    "var(--text-main)",
                }}
              />

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* PIE CHART */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
        }}
        whileHover={{ scale: 1.01 }}
        className="app-card p-4 sm:p-6 rounded-2xl transition-all duration-500 shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Priority Distribution
          </h2>

          <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
        </div>

        <div className="w-full min-w-0 h-[250px] sm:h-[300px]">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                <Cell fill="#ef4444" />
                <Cell fill="#eab308" />
                <Cell fill="#22c55e" />
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "var(--bg-card)",
                  border:
                    "1px solid var(--border-main)",
                  borderRadius: "12px",
                  color:
                    "var(--text-main)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}