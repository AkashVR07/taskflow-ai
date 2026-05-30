"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react";

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

export default function ActivityTimeline({
  tasks,
}: Props) {
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(
          b.updatedAt || b.createdAt || ""
        ).getTime() -
        new Date(
          a.updatedAt || a.createdAt || ""
        ).getTime()
    )
    .slice(0, 5);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl transition-all duration-500 shadow-2xl border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-7">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <Activity size={22} />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Recent Activity
              </h2>

              <p className="app-muted text-sm mt-1">
                Latest workflow updates
              </p>
            </div>
          </div>

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        <div className="relative space-y-5">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent" />

          {recentTasks.length > 0 ? (
            recentTasks.map((task, index) => {
              const isCompleted =
                task.status === "Completed";

              return (
                <motion.div
                  key={task._id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.35,
                  }}
                  className="relative flex items-start gap-4"
                >
                  <div
                    className={`relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border ${
                      isCompleted
                        ? "bg-green-500/15 border-green-500/30 text-green-400"
                        : "bg-yellow-500/15 border-yellow-500/30 text-yellow-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                  </div>

                  <div className="app-soft rounded-2xl p-4 flex-1 border border-cyan-500/10 shadow-md hover:shadow-xl transition-all duration-300">
                    <p className="text-sm sm:text-base break-words">
                      <span className="font-bold">
                        {task.title}
                      </span>{" "}
                      is currently{" "}
                      <span
                        className={
                          isCompleted
                            ? "text-green-400 font-semibold"
                            : "text-yellow-400 font-semibold"
                        }
                      >
                        {task.status}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                        Priority: {task.priority || "Medium"}
                      </span>

                      <span className="text-xs px-3 py-1 rounded-full app-card">
                        <Clock3 size={12} className="inline mr-1" />
                        Recent
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="app-soft rounded-2xl p-6 text-center border border-dashed border-cyan-500/20">
              <p className="font-semibold">
                No recent activity yet
              </p>

              <p className="app-muted text-sm mt-2">
                Your task updates will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}