"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";

type Props = {
  completed: number;
  total: number;
};

export default function ProgressRing({
  completed,
  total,
}: Props) {
  const progress =
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;

  const pending = total - completed;

  const radius = 64;
  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (progress / 100) * circumference;

  const status =
    progress >= 80
      ? "Excellent"
      : progress >= 50
      ? "Good Progress"
      : progress > 0
      ? "Keep Going"
      : "Get Started";

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
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.35,
      }}
      className="relative overflow-hidden app-card rounded-3xl p-6 border border-white/10 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold">
              Productivity
            </h2>

            <p className="app-muted text-sm mt-1">
              Task completion overview
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <div className="absolute inset-4 rounded-full bg-cyan-500/10 blur-xl" />

            <svg
              width="176"
              height="176"
              className="-rotate-90 relative z-10"
            >
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="rgba(148,163,184,0.22)"
                strokeWidth="14"
                fill="transparent"
              />

              <motion.circle
                cx="88"
                cy="88"
                r={radius}
                stroke="url(#productivityGradient)"
                strokeWidth="14"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{
                  strokeDashoffset:
                    circumference,
                }}
                animate={{
                  strokeDashoffset,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                filter="url(#glow)"
              />

              <defs>
                <linearGradient
                  id="productivityGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#06b6d4"
                  />
                  <stop
                    offset="50%"
                    stopColor="#3b82f6"
                  />
                  <stop
                    offset="100%"
                    stopColor="#8b5cf6"
                  />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur
                    stdDeviation="3"
                    result="coloredBlur"
                  />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            <div className="absolute z-20 text-center">
              <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {progress}%
              </h3>

              <p className="app-muted text-xs mt-1 font-medium">
                Completed
              </p>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="app-soft rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400" />

                <div>
                  <p className="font-semibold">
                    Completed
                  </p>

                  <p className="app-muted text-xs">
                    Finished tasks
                  </p>
                </div>
              </div>

              <p className="text-2xl font-extrabold text-green-400">
                {completed}
              </p>
            </div>

            <div className="app-soft rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-yellow-400" />

                <div>
                  <p className="font-semibold">
                    Pending
                  </p>

                  <p className="app-muted text-xs">
                    Remaining tasks
                  </p>
                </div>
              </div>

              <p className="text-2xl font-extrabold text-yellow-400">
                {pending}
              </p>
            </div>

            <div className="rounded-2xl p-4 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-500/20">
              <p className="text-sm app-muted">
                Status
              </p>

              <h3 className="text-xl font-extrabold mt-1">
                {status}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}