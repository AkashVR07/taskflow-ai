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

import {
  BarChart3,
  PieChart as PieIcon,
  CheckCircle2,
  Clock3,
  Flame,
} from "lucide-react";

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

  const tooltipStyle = {
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border-main)",
    borderRadius: "16px",
    color: "var(--text-main)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  };

  return (
    <div className="space-y-6 mt-8">
      {/* TOP SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -3 }}
          className="app-card rounded-3xl p-5 border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-500/15 flex items-center justify-center">
              <CheckCircle2 className="text-green-400" />
            </div>

            <div>
              <p className="app-muted text-sm">
                Completed
              </p>

              <h3 className="text-2xl font-black">
                {completed}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="app-card rounded-3xl p-5 border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-yellow-500/15 flex items-center justify-center">
              <Clock3 className="text-yellow-400" />
            </div>

            <div>
              <p className="app-muted text-sm">
                Pending
              </p>

              <h3 className="text-2xl font-black">
                {pending}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="app-card rounded-3xl p-5 border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-500/15 flex items-center justify-center">
              <Flame className="text-red-400" />
            </div>

            <div>
              <p className="app-muted text-sm">
                High Priority
              </p>

              <h3 className="text-2xl font-black">
                {high}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl transition-all duration-500 shadow-2xl border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                  <BarChart3 size={22} />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold">
                    Task Status Overview
                  </h2>

                  <p className="app-muted text-sm mt-1">
                    Pending vs completed tasks
                  </p>
                </div>
              </div>

              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
            </div>

            <div className="w-full min-w-0 h-[280px] sm:h-[320px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
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
                    cursor={{
                      fill: "rgba(59,130,246,0.08)",
                    }}
                    contentStyle={tooltipStyle}
                  />

                  <Bar
                    dataKey="value"
                    radius={[14, 14, 0, 0]}
                  >
                    <Cell fill="#facc15" />
                    <Cell fill="#22c55e" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
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
          whileHover={{ y: -4 }}
          className="relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl transition-all duration-500 shadow-2xl border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                  <PieIcon size={22} />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold">
                    Priority Distribution
                  </h2>

                  <p className="app-muted text-sm mt-1">
                    High, medium and low task split
                  </p>
                </div>
              </div>

              <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
            </div>

            <div className="w-full min-w-0 h-[280px] sm:h-[320px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={95}
                    innerRadius={50}
                    paddingAngle={5}
                    label
                  >
                    <Cell fill="#ef4444" />
                    <Cell fill="#eab308" />
                    <Cell fill="#22c55e" />
                  </Pie>

                  <Tooltip
                    contentStyle={tooltipStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="app-soft rounded-2xl p-3 text-center">
                <p className="text-red-400 font-bold">
                  High
                </p>
                <p className="app-muted text-xs mt-1">
                  {high}
                </p>
              </div>

              <div className="app-soft rounded-2xl p-3 text-center">
                <p className="text-yellow-400 font-bold">
                  Medium
                </p>
                <p className="app-muted text-xs mt-1">
                  {medium}
                </p>
              </div>

              <div className="app-soft rounded-2xl p-3 text-center">
                <p className="text-green-400 font-bold">
                  Low
                </p>
                <p className="app-muted text-xs mt-1">
                  {low}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}