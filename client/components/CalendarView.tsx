"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Flag,
} from "lucide-react";

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

export default function CalendarView({ tasks }: Props) {
  const tasksWithDates = tasks.filter(
    (task) => task.dueDate
  );

  const getPriorityClass = (priority?: string) => {
    if (priority === "High") {
      return "bg-red-500/15 text-red-400 border-red-500/30";
    }

    if (priority === "Low") {
      return "bg-green-500/15 text-green-400 border-green-500/30";
    }

    return "bg-yellow-500/15 text-yellow-500 border-yellow-500/30";
  };

  const getStatusClass = (status: string) => {
    if (status === "Completed") {
      return "bg-green-500/15 text-green-400 border-green-500/30";
    }

    return "bg-blue-500/15 text-blue-500 border-blue-500/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl transition-all duration-500 shadow-2xl border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <CalendarDays size={22} />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Upcoming Deadlines
              </h2>

              <p className="app-muted text-sm mt-1">
                Track due dates clearly
              </p>
            </div>
          </div>

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shrink-0" />
        </div>

        <div className="space-y-4">
          {tasksWithDates.length > 0 ? (
            tasksWithDates.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.35,
                }}
                whileHover={{
                  scale: 1.015,
                  y: -2,
                }}
                className="app-soft p-4 rounded-2xl border border-cyan-500/10 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-base sm:text-lg break-words">
                        {task.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClass(
                            task.status
                          )}`}
                        >
                          <Clock3 size={13} />
                          {task.status}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          <Flag size={13} />
                          {task.priority || "Medium"}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border border-slate-200 shadow-lg">
                        <CalendarDays size={15} />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="app-soft rounded-2xl p-5 text-center">
              <p className="app-muted text-sm sm:text-base">
                No upcoming deadlines.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}