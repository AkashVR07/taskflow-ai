"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  Clock3,
  Sparkles,
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

  const radius = 62;

  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (progress / 100) * circumference;

  const status =
    progress >= 80
      ? "Excellent Productivity"
      : progress >= 50
      ? "Good Progress"
      : progress > 0
      ? "Keep Going"
      : "Start Your Workflow";

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
        y: -5,
      }}
      transition={{
        duration: 0.35,
      }}
      className="relative overflow-hidden app-card rounded-[32px] p-7 shadow-2xl border border-white/10"
    >
      {/* BACKGROUND EFFECTS */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <div className="flex items-center gap-2">

              <Sparkles
                size={20}
                className="text-cyan-400"
              />

              <p className="uppercase tracking-[0.2em] text-xs font-bold text-cyan-400">
                Performance
              </p>

            </div>

            <h2 className="text-3xl font-black mt-2">
              Productivity
            </h2>

            <p className="app-muted text-sm mt-1">
              Real-time workflow insights
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.45)]">
            <TrendingUp
              size={26}
              className="text-white"
            />
          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* PROGRESS RING */}

          <div className="flex justify-center">

            <div className="relative w-[220px] h-[220px] flex items-center justify-center">

              {/* GLOW */}

              <div className="absolute inset-8 rounded-full bg-cyan-500/15 blur-2xl animate-pulse" />

              {/* SVG */}

              <svg
                width="220"
                height="220"
                className="-rotate-90"
              >

                {/* TRACK */}

                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  stroke="rgba(148,163,184,0.15)"
                  strokeWidth="14"
                  fill="transparent"
                />

                {/* PROGRESS */}

                <motion.circle
                  cx="110"
                  cy="110"
                  r={radius}
                  stroke="url(#premiumGradient)"
                  strokeWidth="14"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={
                    circumference
                  }
                  initial={{
                    strokeDashoffset:
                      circumference,
                  }}
                  animate={{
                    strokeDashoffset,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                  }}
                  filter="url(#glow)"
                />

                {/* GRADIENT */}

                <defs>

                  <linearGradient
                    id="premiumGradient"
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
                      stdDeviation="4"
                      result="coloredBlur"
                    />

                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                </defs>

              </svg>

              {/* CENTER */}

              <div className="absolute text-center z-20">

                <h3 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {progress}%
                </h3>

                <p className="app-muted mt-2 text-sm font-medium">
                  Completed
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="space-y-5">

            {/* COMPLETED */}

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="app-soft rounded-3xl p-5 border border-green-500/10"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="text-green-400" />
                  </div>

                  <div>

                    <p className="font-bold text-lg">
                      Completed
                    </p>

                    <p className="app-muted text-sm">
                      Successfully finished
                    </p>

                  </div>

                </div>

                <h3 className="text-3xl font-black text-green-400">
                  {completed}
                </h3>

              </div>

            </motion.div>

            {/* PENDING */}

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="app-soft rounded-3xl p-5 border border-yellow-500/10"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 flex items-center justify-center">
                    <Clock3 className="text-yellow-400" />
                  </div>

                  <div>

                    <p className="font-bold text-lg">
                      Pending
                    </p>

                    <p className="app-muted text-sm">
                      Remaining workload
                    </p>

                  </div>

                </div>

                <h3 className="text-3xl font-black text-yellow-400">
                  {pending}
                </h3>

              </div>

            </motion.div>

            {/* STATUS */}

            <div className="rounded-3xl p-5 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 border border-cyan-500/20 shadow-lg">

              <p className="uppercase tracking-[0.2em] text-xs font-bold text-cyan-400">
                Current Status
              </p>

              <h3 className="text-2xl font-black mt-3">
                {status}
              </h3>

              <p className="app-muted text-sm mt-2">
                {completed} of {total} tasks are completed successfully.
              </p>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}