"use client";

import axios from "axios";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  dueDate?: string;
};

type Props = {
  tasks: Task[];
  fetchTasks: () => void;
};

export default function KanbanBoard({
  tasks,
  fetchTasks,
}: Props) {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("userInfo") || "{}"
        )
      : null;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const updateTaskStatus = async (
    taskId: string,
    status: string
  ) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    status: string
  ) => {
    e.preventDefault();

    const taskId =
      e.dataTransfer.getData("taskId");

    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  const allowDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-7 items-start">
      {/* PENDING */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onDragOver={allowDrop}
        onDrop={(e) =>
          handleDrop(e, "Pending")
        }
        className="group relative overflow-hidden bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-5 sm:p-6 min-h-[500px] transition-all duration-500 shadow-xl hover:shadow-yellow-500/10"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-yellow-400 drop-shadow-[0_0_12px_rgba(234,179,8,0.5)]">
                Pending
              </h3>

              <p className="app-muted text-sm mt-1">
                Tasks waiting to be completed
              </p>
            </div>

            <span className="text-xs sm:text-sm bg-yellow-500/20 text-yellow-300 px-4 py-1 rounded-full border border-yellow-500/20 shadow-md shrink-0">
              {pendingTasks.length}
            </span>
          </div>

          <div className="space-y-5">
            {pendingTasks.map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) =>
                  handleDragStart(
                    e,
                    task._id
                  )
                }
                className="cursor-grab active:cursor-grabbing transition-all duration-300 hover:scale-[1.01]"
              >
                <TaskCard
                  id={task._id}
                  title={task.title}
                  description={
                    task.description
                  }
                  status={task.status}
                  priority={
                    task.priority
                  }
                  dueDate={
                    task.dueDate
                  }
                  fetchTasks={
                    fetchTasks
                  }
                />
              </div>
            ))}

            {pendingTasks.length === 0 && (
              <div className="app-soft rounded-2xl border border-dashed border-yellow-500/20 text-center py-14 px-6">
                <p className="text-yellow-300 font-semibold text-lg">
                  No pending tasks
                </p>

                <p className="app-muted text-sm mt-2">
                  Drag tasks here or create a new one.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* COMPLETED */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onDragOver={allowDrop}
        onDrop={(e) =>
          handleDrop(e, "Completed")
        }
        className="group relative overflow-hidden bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-cyan-500/10 border border-green-500/20 rounded-3xl p-5 sm:p-6 min-h-[500px] transition-all duration-500 shadow-xl hover:shadow-green-500/10"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]">
                Completed
              </h3>

              <p className="app-muted text-sm mt-1">
                Finished and verified work
              </p>
            </div>

            <span className="text-xs sm:text-sm bg-green-500/20 text-green-300 px-4 py-1 rounded-full border border-green-500/20 shadow-md shrink-0">
              {completedTasks.length}
            </span>
          </div>

          <div className="space-y-5">
            {completedTasks.map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) =>
                  handleDragStart(
                    e,
                    task._id
                  )
                }
                className="cursor-grab active:cursor-grabbing transition-all duration-300 hover:scale-[1.01]"
              >
                <TaskCard
                  id={task._id}
                  title={task.title}
                  description={
                    task.description
                  }
                  status={task.status}
                  priority={
                    task.priority
                  }
                  dueDate={
                    task.dueDate
                  }
                  fetchTasks={
                    fetchTasks
                  }
                />
              </div>
            ))}

            {completedTasks.length === 0 && (
              <div className="app-soft rounded-2xl border border-dashed border-green-500/20 text-center py-14 px-6">
                <p className="text-green-300 font-semibold text-lg">
                  No completed tasks
                </p>

                <p className="app-muted text-sm mt-2">
                  Completed tasks will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}