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

export default function CalendarView({ tasks }: Props) {
  const tasksWithDates = tasks.filter((task) => task.dueDate);

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="app-card p-4 sm:p-6 rounded-2xl transition-all duration-500 shadow-lg"
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">
          Upcoming Deadlines
        </h2>

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
                delay: index * 0.1,
                duration: 0.4,
              }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-sky-500/10 border border-cyan-500/20 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-500 shadow-md"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-base sm:text-lg break-words">
                  {task.title}
                </h3>

                <p className="text-xs sm:text-sm app-muted mt-1">
                  Status: {task.status} | Priority: {task.priority || "Medium"}
                </p>
              </div>

              <span className="w-fit bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-xs sm:text-sm border border-cyan-500/20 shadow-md shrink-0">
                {task.dueDate}
              </span>
            </motion.div>
          ))
        ) : (
          <p className="app-muted text-sm sm:text-base">
            No upcoming deadlines.
          </p>
        )}
      </div>
    </motion.div>
  );
}