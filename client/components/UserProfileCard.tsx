"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

type Props = {
  user: any;
  tasks: any[];
};

export default function UserProfileCard({ user, tasks }: Props) {
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="app-card p-4 sm:p-6 rounded-2xl mt-8 transition-all duration-500"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 shadow-lg">
          {user?.name?.charAt(0)}
        </div>

        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold break-words">
            {user?.name}
          </h2>

          <p className="app-muted mt-1 text-sm sm:text-base break-words">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-base sm:text-lg">
            Overall Progress
          </p>

          <p className="app-muted text-sm">
            <CountUp end={progress} duration={1.5} />%
          </p>
        </div>

        <div className="w-full h-4 rounded-full bg-zinc-700/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}