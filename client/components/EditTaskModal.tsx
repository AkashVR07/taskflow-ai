"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type Props = {
  task: {
    _id: string;
    title: string;
    description: string;
    priority?: string;
    dueDate?: string;
  };
  closeModal: () => void;
  fetchTasks: () => void;
};

export default function EditTaskModal({
  task,
  closeModal,
  fetchTasks,
}: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority || "Medium");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [loading, setLoading] = useState(false);

  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo") || "{}")
      : null;

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `process.env.NEXT_PUBLIC_API_URL/api/tasks/${task._id}`,
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchTasks();

      toast.dismiss();
      toast.success("Task updated successfully");

      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="app-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl border border-[var(--border-main)]"
      >
        <div className="flex items-start justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Edit Task
            </h2>

            <p className="app-muted mt-1 text-sm sm:text-base">
              Update your task details
            </p>
          </div>

          <button
            onClick={closeModal}
            className="w-10 h-10 shrink-0 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={updateTask} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 sm:p-4 rounded-2xl app-input outline-none focus:border-blue-500 transition-all duration-300"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 sm:p-4 rounded-2xl app-input outline-none focus:border-blue-500 transition-all duration-300 min-h-[120px] sm:min-h-[140px]"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-2xl app-input outline-none focus:border-blue-500 transition-all duration-300"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-2xl app-input outline-none focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto bg-zinc-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-zinc-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}