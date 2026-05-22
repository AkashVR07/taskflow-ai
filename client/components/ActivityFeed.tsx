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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Activity Feed
        </h2>

        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
      </div>

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
              className="app-soft rounded-2xl p-4 flex items-start gap-4 hover:scale-[1.01] transition-all duration-300"
            >
              <div>
                {task.status ===
                "Completed" ? (
                  <CheckCircle2 className="text-green-400" />
                ) : task.priority ===
                  "High" ? (
                  <AlertTriangle className="text-yellow-400" />
                ) : (
                  <PlusCircle className="text-cyan-400" />
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  {task.title}
                </p>

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