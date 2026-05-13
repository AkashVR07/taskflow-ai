"use client";

import { motion } from "framer-motion";

type Task = {
  _id: string;
  title: string;
  status: string;
  priority?: string;
  dueDate?: string;
};

type Props = {
  tasks: Task[];
};

export default function NotificationCenter({ tasks }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const highPriority = tasks.filter(
    (task) => task.priority === "High" && task.status !== "Completed"
  );

  const overdue = tasks.filter(
    (task) =>
      task.dueDate && task.dueDate < today && task.status !== "Completed"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="app-card p-4 sm:p-6 rounded-2xl mt-8 transition-all duration-500 shadow-lg"
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">
          Notifications
        </h2>

        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shrink-0" />
      </div>

      <div className="space-y-4">
        {overdue.length > 0 && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl shadow-md"
          >
            <p className="font-semibold text-sm sm:text-base">
              ⚠ Overdue Tasks
            </p>

            <p className="mt-1 text-xs sm:text-sm">
              {overdue.length} overdue task(s) need attention.
            </p>
          </motion.div>
        )}

        {highPriority.length > 0 && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-4 rounded-xl shadow-md"
          >
            <p className="font-semibold text-sm sm:text-base">
              🚀 High Priority
            </p>

            <p className="mt-1 text-xs sm:text-sm">
              {highPriority.length} high priority pending task(s).
            </p>
          </motion.div>
        )}

        {overdue.length === 0 && highPriority.length === 0 && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl shadow-md"
          >
            <p className="font-semibold text-sm sm:text-base">
              ✅ All Good
            </p>

            <p className="mt-1 text-xs sm:text-sm">
              Everything looks good. No urgent alerts.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}