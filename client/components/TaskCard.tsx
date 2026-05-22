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
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("userInfo") || "{}"
        )
      : null;

  const [showModal, setShowModal] =
    useState(false);

  const updateStatus = async () => {
    const newStatus =
      status === "Completed"
        ? "Pending"
        : "Completed";

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
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
            Authorization: `Bearer ${userInfo.token}`,
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
          scale: 1.01,
        }}
        transition={{
          duration: 0.3,
        }}
        className="app-card p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 backdrop-blur-md overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <h2 className="text-xl sm:text-2xl font-bold break-words leading-snug">
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

        <p className="app-muted mt-5 leading-relaxed text-sm sm:text-[15px] break-words">
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

        {showModal && (
          <EditTaskModal
            task={{
              _id: id,
              title,
              description,
              priority,
              dueDate,
            }}
            closeModal={() =>
              setShowModal(false)
            }
            fetchTasks={fetchTasks}
          />
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
          <button
            onClick={updateStatus}
            className="w-full sm:w-auto bg-gradient-to-r from-[#151515] to-[#2d2412] border border-yellow-700/30 text-yellow-300 px-5 py-3 rounded-xl font-semibold shadow-md hover:scale-[1.03] hover:shadow-yellow-500/20 transition-all duration-300 text-sm"
          >
            Toggle Status
          </button>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="w-full sm:w-auto bg-blue-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:scale-[1.03] transition-all duration-300 shadow-md text-sm"
          >
            Edit
          </button>

          <button
            onClick={deleteTask}
            className="w-full sm:w-auto bg-red-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-600 hover:scale-[1.03] transition-all duration-300 shadow-md text-sm"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </>
  );
}