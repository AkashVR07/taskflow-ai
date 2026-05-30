"use client";

import { motion } from "framer-motion";
import {
  BellRing,
  AlertTriangle,
  Flame,
  CheckCircle2,
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

export default function NotificationCenter({
  tasks,
}: Props) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const highPriority = tasks.filter(
    (task) =>
      task.priority === "High" &&
      task.status !== "Completed"
  );

  const overdue = tasks.filter(
    (task) =>
      task.dueDate &&
      task.dueDate < today &&
      task.status !== "Completed"
  );

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
      transition={{
        duration: 0.5,
      }}
      className="relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl mt-8 transition-all duration-500 shadow-2xl border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <BellRing size={22} />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Notifications
              </h2>

              <p className="app-muted text-sm mt-1">
                Smart alerts for your workflow
              </p>
            </div>
          </div>

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shrink-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* OVERDUE */}
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -3,
            }}
            className="relative overflow-hidden rounded-2xl border border-red-500/25 bg-red-500/10 p-4 shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-red-500/15 flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-400" />
              </div>

              <p className="font-bold text-red-400">
                Overdue Tasks
              </p>

              <h3 className="text-3xl font-black mt-2 text-red-400">
                {overdue.length}
              </h3>

              <p className="app-muted text-sm mt-2">
                Tasks need immediate attention.
              </p>
            </div>
          </motion.div>

          {/* HIGH PRIORITY */}
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -3,
            }}
            className="relative overflow-hidden rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4 shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-yellow-500/15 flex items-center justify-center mb-4">
                <Flame className="text-yellow-400" />
              </div>

              <p className="font-bold text-yellow-400">
                High Priority
              </p>

              <h3 className="text-3xl font-black mt-2 text-yellow-400">
                {highPriority.length}
              </h3>

              <p className="app-muted text-sm mt-2">
                Important pending tasks.
              </p>
            </div>
          </motion.div>

          {/* ALL GOOD */}
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -3,
            }}
            className="relative overflow-hidden rounded-2xl border border-green-500/25 bg-green-500/10 p-4 shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-green-500/15 flex items-center justify-center mb-4">
                <CheckCircle2 className="text-green-400" />
              </div>

              <p className="font-bold text-green-400">
                System Status
              </p>

              <h3 className="text-3xl font-black mt-2 text-green-400">
                {overdue.length === 0 &&
                highPriority.length === 0
                  ? "Good"
                  : "Check"}
              </h3>

              <p className="app-muted text-sm mt-2">
                {overdue.length === 0 &&
                highPriority.length === 0
                  ? "No urgent alerts found."
                  : "Review your task alerts."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}