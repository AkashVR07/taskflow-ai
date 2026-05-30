"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Activity,
} from "lucide-react";

type Props = {
  tasks: any[];
};

export default function ActivityFeed({
  tasks,
}: Props) {
  const recentTasks = [...tasks]
    .reverse()
    .slice(0, 5);

  return (
    <div className="relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <Activity size={22} />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Activity Feed
              </h2>

              <p className="app-muted text-sm mt-1">
                Latest task updates
              </p>
            </div>
          </div>

          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {recentTasks.length === 0 ? (
            <div className="app-soft rounded-2xl p-6 text-center border border-dashed border-cyan-500/20">
              <p className="font-semibold">
                No recent activity
              </p>

              <p className="app-muted text-sm mt-2">
                Create or update tasks to see activity here.
              </p>
            </div>
          ) : (
            recentTasks.map((task, index) => (
              <motion.div
                key={task._id || index}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.3,
                }}
                whileHover={{
                  scale: 1.015,
                  y: -2,
                }}
                className="relative app-soft rounded-2xl p-4 flex items-start gap-4 hover:border-cyan-500/25 border border-transparent transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                    task.status === "Completed"
                      ? "bg-green-500/15 border border-green-500/20"
                      : task.priority === "High"
                      ? "bg-yellow-500/15 border border-yellow-500/20"
                      : "bg-cyan-500/15 border border-cyan-500/20"
                  }`}
                >
                  {task.status === "Completed" ? (
                    <CheckCircle2 className="text-green-400" />
                  ) : task.priority === "High" ? (
                    <AlertTriangle className="text-yellow-400" />
                  ) : (
                    <PlusCircle className="text-cyan-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-bold text-base sm:text-lg truncate">
                      {task.title}
                    </p>

                    <span className="text-xs app-muted whitespace-nowrap px-3 py-1 rounded-full app-card">
                      Recent
                    </span>
                  </div>

                  <p className="text-sm app-muted mt-1">
                    {task.status === "Completed"
                      ? "Task completed successfully"
                      : task.priority === "High"
                      ? "High priority task needs attention"
                      : "Task added to your workflow"}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
                      {task.status}
                    </span>

                    <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                      {task.priority || "Medium"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}