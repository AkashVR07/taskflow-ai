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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-zinc-900/20 border border-purple-500/20 p-4 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02]">
          <p className="app-muted text-sm">Total</p>
          <h3 className="text-2xl font-bold mt-2">
            <CountUp end={tasks.length} duration={1.5} />
          </h3>
        </div>

        <div className="bg-gradient-to-br from-green-500/15 to-green-500/5 border border-green-500/30 p-4 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02]">
          <p className="app-muted text-sm">Completed</p>
          <h3 className="text-2xl font-extrabold mt-2 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
            <CountUp end={completedTasks} duration={1.5} />
          </h3>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 border border-yellow-500/30 p-4 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02]">
          <p className="app-muted text-sm">Pending</p>
          <h3 className="text-2xl font-extrabold mt-2 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
            <CountUp end={pendingTasks} duration={1.5} />
          </h3>
        </div>

        <div className="bg-gradient-to-br from-sky-500/15 to-sky-500/5 border border-sky-500/30 p-4 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02]">
          <p className="app-muted text-sm">Productivity</p>
          <h3 className="text-2xl font-extrabold mt-2 text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]">
            <CountUp end={progress} duration={1.5} />%
          </h3>
        </div>
      </div>
    </motion.div>
  );
}