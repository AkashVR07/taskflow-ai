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
      ? JSON.parse(localStorage.getItem("userInfo") || "{}")
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
            Authorization: `Bearer ${userInfo.token}`,
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
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
      {/* PENDING */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onDragOver={allowDrop}
        onDrop={(e) =>
          handleDrop(e, "Pending")
        }
        className="bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 sm:p-5 min-h-[450px] transition-all duration-500 shadow-lg"
      >
        <div className="flex items-center justify-between gap-4 mb-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-yellow-400 drop-shadow-[0_0_12px_rgba(234,179,8,0.5)]">
            Pending
          </h3>

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
              className="cursor-grab active:cursor-grabbing"
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
            <div className="text-center py-10 app-muted text-sm sm:text-base">
              No pending tasks
            </div>
          )}
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
        className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-cyan-500/10 border border-green-500/20 rounded-2xl p-4 sm:p-5 min-h-[450px] transition-all duration-500 shadow-lg"
      >
        <div className="flex items-center justify-between gap-4 mb-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]">
            Completed
          </h3>

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
              className="cursor-grab active:cursor-grabbing"
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
            <div className="text-center py-10 app-muted text-sm sm:text-base">
              No completed tasks
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}