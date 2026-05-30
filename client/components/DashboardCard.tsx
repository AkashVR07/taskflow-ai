"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp } from "lucide-react";

type Props = {
  title: string;
  value: string;
  icon?: string;
  gradient?: string;
};

export default function DashboardCard({
  title,
  value,
  icon,
  gradient,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -6,
        scale: 1.025,
      }}
      transition={{
        duration: 0.3,
      }}
      className="group relative overflow-hidden app-card rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] transition-all duration-500"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          gradient || "from-cyan-500 to-blue-500"
        } opacity-20 group-hover:opacity-30 transition-all duration-500`}
      />

      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full opacity-40" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="app-muted text-sm sm:text-base font-semibold">
              {title}
            </p>

            <h2 className="text-4xl sm:text-5xl font-black mt-3 tracking-tight">
              <CountUp
                end={Number(value)}
                duration={1.4}
              />
            </h2>
          </div>

          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
              gradient || "from-cyan-500 to-blue-500"
            } flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-all duration-300`}
          >
            {icon ? (
              <span className="text-3xl">
                {icon}
              </span>
            ) : (
              <TrendingUp size={24} />
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

          <p className="text-xs app-muted">
            Updated in real time
          </p>
        </div>
      </div>
    </motion.div>
  );
}