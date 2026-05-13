"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

type Props = {
  title: string;
  value: string;
};

export default function DashboardCard({ title, value }: Props) {
  const isCompleted = title === "Completed";
  const isPending = title === "Pending";
  const isTotal = title === "Total Tasks";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`p-4 sm:p-6 rounded-2xl border shadow-lg transition-all duration-500 overflow-hidden relative
        ${
          isCompleted
            ? "bg-gradient-to-br from-green-500/15 to-green-500/5 border-green-500/30"
            : isPending
            ? "bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 border-yellow-500/30"
            : isTotal
            ? "bg-gradient-to-br from-purple-500/15 via-pink-500/5 to-zinc-900/20 border-purple-500/20"
            : "app-card"
        }
      `}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-white/20 to-transparent" />

      <div className="relative z-10">
        <p className="app-muted text-sm sm:text-base font-medium">
          {title}
        </p>

        <h2
          className={`text-3xl sm:text-4xl font-extrabold mt-3
            ${
              isCompleted
                ? "text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                : isPending
                ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]"
                : "text-[var(--text-main)]"
            }
          `}
        >
          <CountUp end={Number(value)} duration={1.5} />
        </h2>
      </div>
    </motion.div>
  );
}