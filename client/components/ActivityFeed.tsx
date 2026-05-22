"use client";

import {
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
} from "lucide-react";

type Props = {
  tasks: any[];
};

export default function ActivityFeed({
  tasks,
}: Props) {
  const recentTasks = [...tasks]
    .reverse()
    .slice(0, 5);

  return (
    <div className="app-card p-6 rounded-3xl border border-white/10 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Activity Feed
        </h2>

        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
      </div>

      {/* ACTIVITIES */}
      <div className="space-y-4">

        {recentTasks.length === 0 ? (
          <div className="app-soft rounded-2xl p-4">
            <p className="app-muted">
              No recent activity.
            </p>
          </div>
        ) : (
          recentTasks.map((task, index) => (
            <div
              key={index}
              className="app-soft rounded-2xl p-4 flex items-start gap-4 hover:scale-[1.01] hover:border-cyan-500/20 border border-transparent transition-all duration-300"
            >
              {/* ICON BOX */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                ${
                  task.status === "Completed"
                    ? "bg-green-500/15 border border-green-500/20"
                    : task.priority === "High"
                    ? "bg-yellow-500/15 border border-yellow-500/20"
                    : "bg-cyan-500/15 border border-cyan-500/20"
                }`}
              >
                {task.status === "Completed" ? (
                  <CheckCircle2 className="text-green-400" />
                ) : task.priority ===
                  "High" ? (
                  <AlertTriangle className="text-yellow-400" />
                ) : (
                  <PlusCircle className="text-cyan-400" />
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">

                  <p className="font-semibold text-base sm:text-lg truncate">
                    {task.title}
                  </p>

                  <span className="text-xs app-muted whitespace-nowrap">
                    Recent
                  </span>
                </div>

                <p className="text-sm app-muted mt-1">
                  {task.status ===
                  "Completed"
                    ? "Task completed successfully"
                    : task.priority ===
                      "High"
                    ? "High priority task added"
                    : "New task created"}
                </p>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}