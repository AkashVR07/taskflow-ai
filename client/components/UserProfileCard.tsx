"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  CheckCircle2,
  Clock3,
  User,
  Sparkles,
} from "lucide-react";

type Props = {
  user: any;
  tasks: any[];
};

export default function UserProfileCard({
  user,
  tasks,
}: Props) {
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl mt-8 transition-all duration-500 shadow-2xl border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center text-3xl sm:text-4xl font-black shrink-0 shadow-xl">
                {user?.name
                  ? user.name
                      .charAt(0)
                      .toUpperCase()
                  : <User size={34} />}
              </div>

              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-4 border-[var(--bg-card)] shadow-lg"></span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black break-words">
                  {user?.name || "TaskFlow User"}
                </h2>

                <Sparkles className="text-cyan-400 shrink-0" size={20} />
              </div>

              <p className="app-muted mt-2 text-sm sm:text-base break-words">
                {user?.email || "No email available"}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                  Pro Member
                </span>

                <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full xl:w-auto">
            <div className="app-soft rounded-2xl p-4 min-w-[140px]">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 size={18} />
                <span className="text-sm font-semibold">
                  Completed
                </span>
              </div>

              <h3 className="text-3xl font-black mt-2">
                <CountUp
                  end={completedTasks}
                  duration={1.4}
                />
              </h3>
            </div>

            <div className="app-soft rounded-2xl p-4 min-w-[140px]">
              <div className="flex items-center gap-2 text-yellow-400">
                <Clock3 size={18} />
                <span className="text-sm font-semibold">
                  Pending
                </span>
              </div>

              <h3 className="text-3xl font-black mt-2">
                <CountUp
                  end={pendingTasks}
                  duration={1.4}
                />
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-base sm:text-lg">
              Overall Progress
            </p>

            <p className="text-cyan-400 text-sm font-bold">
              <CountUp
                end={progress}
                duration={1.5}
              />
              %
            </p>
          </div>

          <div className="w-full h-4 rounded-full bg-slate-500/20 overflow-hidden">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.45)]"
            />
          </div>

          <p className="app-muted text-sm mt-3">
            {completedTasks} of {tasks.length} tasks completed successfully.
          </p>
        </div>
      </div>
    </motion.div>
  );
}