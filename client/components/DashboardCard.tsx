"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 shadow-xl border border-white/10 bg-gradient-to-br ${
        gradient || "from-cyan-500 to-blue-500"
      }`}
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-xl" />

      <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white/30 to-transparent" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-white/75 text-sm sm:text-base font-medium">
            {title}
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 drop-shadow-lg">
            <CountUp
              end={Number(value)}
              duration={1.5}
            />
          </h2>
        </div>

        {icon && (
          <div className="text-4xl sm:text-5xl drop-shadow-lg">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}