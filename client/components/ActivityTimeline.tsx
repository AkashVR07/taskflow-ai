"use client";

import { motion } from "framer-motion";

type Task = {
  _id: string;
  title: string;
  status: string;
  priority?: string;
  updatedAt?: string;
  createdAt?: string;
};

type Props = {
  tasks: Task[];
};

export default function ActivityTimeline({ tasks }: Props) {
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || "").getTime() -
        new Date(a.updatedAt || "").getTime()
    )
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="app-card p-4 sm:p-6 rounded-2xl transition-all duration-500 shadow-lg"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {recentTasks.length > 0 ? (
          recentTasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
              }}
              className="flex items-start gap-4 border-b border-[var(--border-main)] pb-4 last:border-b-0"
            >
              <div
                className={`w-3 h-3 rounded-full mt-2 shrink-0 ${
                  task.status === "Completed"
                    ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                    : "bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.7)]"
                }`}
              />

              <div className="min-w-0">
                <p className="text-sm sm:text-base break-words">
                  <span className="font-semibold">{task.title}</span>{" "}
                  is currently{" "}
                  <span
                    className={
                      task.status === "Completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }
                  >
                    {task.status}
                  </span>
                </p>

                <p className="text-xs sm:text-sm app-muted mt-1">
                  Priority: {task.priority || "Medium"}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="app-muted text-sm sm:text-base">
            No recent activity yet.
          </p>
        )}
      </div>
    </motion.div>
  );
}