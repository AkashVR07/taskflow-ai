"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";

import EditTaskModal from "./EditTaskModal";

type Props = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  dueDate?: string;
  fetchTasks: () => void;
};

export default function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  dueDate,
  fetchTasks,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo") || "{}")
      : null;

  const updateStatus = async () => {
    const newStatus =
      status === "Completed" ? "Pending" : "Completed";

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      fetchTasks();
      toast.dismiss();
      toast.success(`Task moved to ${newStatus}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      fetchTasks();
      toast.dismiss();
      toast.success("Task deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  const priorityColor =
    priority === "High"
      ? "bg-red-500/20 text-red-400 border border-red-500/20"
      : priority === "Low"
      ? "bg-green-500/20 text-green-400 border border-green-500/20"
      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden app-card p-5 sm:p-6 rounded-3xl border border-white/10 shadow-xl hover:shadow-[0_0_35px_rgba(59,130,246,0.18)] hover:border-cyan-500/30 transition-all duration-500 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <h2 className="text-xl sm:text-2xl font-extrabold break-words leading-snug tracking-tight">
              {title}
            </h2>

            <span
              className={`text-xs sm:text-sm px-4 py-1 rounded-full shrink-0 border shadow-md w-fit ${
                status === "Completed"
                  ? "bg-green-500/20 text-green-400 border-green-500/20"
                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
              }`}
            >
              {status}
            </span>
          </div>

          <p className="app-muted mt-5 leading-relaxed text-sm sm:text-[15px] break-words line-clamp-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm ${priorityColor}`}
            >
              {priority || "Medium"} Priority
            </span>

            {dueDate && (
              <span className="px-4 py-2 rounded-full text-xs sm:text-sm bg-blue-500/20 text-blue-400 border border-blue-500/20 shadow-sm">
                Due: {dueDate}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            <button
              onClick={updateStatus}
              className="w-full bg-gradient-to-r from-[#1a1a1a] to-[#2f2414] border border-yellow-700/20 text-yellow-300 px-5 py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.03] hover:shadow-yellow-500/20 transition-all duration-300 text-sm"
            >
              Toggle Status
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-2xl font-semibold hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 text-sm"
            >
              Edit
            </button>

            <button
              onClick={deleteTask}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-3 rounded-2xl font-semibold hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-red-500/30 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <EditTaskModal
          task={{
            _id: id,
            title,
            description,
            priority,
            dueDate,
          }}
          closeModal={() => setShowModal(false)}
          fetchTasks={fetchTasks}
        />
      )}
    </>
  );
}