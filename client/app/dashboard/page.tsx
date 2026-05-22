"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import ActivityTimeline from "@/components/ActivityTimeline";
import ActivityFeed from "@/components/ActivityFeed";
import CalendarView from "@/components/CalendarView";
import UserProfileCard from "@/components/UserProfileCard";
import KanbanBoard from "@/components/KanbanBoard";
import NotificationCenter from "@/components/NotificationCenter";
import CreateTaskModal from "@/components/CreateTaskModal";
import ProgressRing from "@/components/ProgressRing";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] =
    useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const fetchTasks = async () => {
    if (!userInfo?.token) return;

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tasks");
    }
  };

  const filteredTasks = [...tasks]
    .filter((task) => {
      const matchesSearch = task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesPriority =
        filterPriority === "All"
          ? true
          : task.priority === filterPriority;

      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      }

      if (sortBy === "Oldest") {
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      }

      if (sortBy === "Due Date") {
        return (
          new Date(a.dueDate || "").getTime() -
          new Date(b.dueDate || "").getTime()
        );
      }

      return 0;
    });

  const getAISuggestions = async () => {
    if (!userInfo?.token) return;

    try {
      setAiLoading(true);
      setAiSuggestion("");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/suggestions`,
        { tasks },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setTimeout(() => {
        setAiSuggestion(data.suggestion);
        setAiLoading(false);
        toast.success("AI suggestions generated");
      }, 1500);
    } catch (error) {
      console.log(error);
      setAiLoading(false);
      toast.error("Failed to generate suggestions");
    }
  };

  useEffect(() => {
    const storedUser =
      localStorage.getItem("userInfo");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    setUserInfo(JSON.parse(storedUser));
  }, [router]);

  useEffect(() => {
    if (userInfo?.token) {
      fetchTasks();
    }
  }, [userInfo]);

  return (
    <div className="min-h-screen app-bg">
      <Sidebar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:ml-72 min-w-0 px-4 py-5 pb-28 md:px-8 lg:px-10 lg:pb-5 overflow-x-hidden"
      >
        <Navbar />

        <section
          id="dashboard"
          className="pt-6 scroll-mt-8"
        >
          <UserProfileCard
            user={userInfo}
            tasks={tasks}
          />

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
            <DashboardCard
              title="Total Tasks"
              value={tasks.length.toString()}
              icon="📋"
              gradient="from-cyan-500 to-blue-500"
            />

            <DashboardCard
              title="Completed"
              value={tasks
                .filter(
                  (task) =>
                    task.status === "Completed"
                )
                .length.toString()}
              icon="✅"
              gradient="from-green-500 to-emerald-500"
            />

            <DashboardCard
              title="Pending"
              value={tasks
                .filter(
                  (task) =>
                    task.status === "Pending"
                )
                .length.toString()}
              icon="⏳"
              gradient="from-yellow-500 to-orange-500"
            />

            <DashboardCard
              title="High Priority"
              value={tasks
                .filter(
                  (task) =>
                    task.priority === "High"
                )
                .length.toString()}
              icon="🔥"
              gradient="from-pink-500 to-red-500"
            />
          </section>

          <NotificationCenter tasks={tasks} />

          <div className="mt-8">
            <ActivityFeed tasks={tasks} />

            <div className="mt-8">
              <ProgressRing
                completed={
                  tasks.filter(
                    (task) =>
                      task.status === "Completed"
                  ).length
                }
              total={tasks.length}
            />
          </div>
          </div>

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mt-8">
            <ActivityTimeline tasks={tasks} />
            <CalendarView tasks={tasks} />
          </section>
        </section>

        <section
          id="analytics"
          className="pt-20 scroll-mt-8"
        >
          <AnalyticsChart tasks={tasks} />
        </section>

        <section
          id="tasks"
          className="pt-20 scroll-mt-8"
        >
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-bold">
                Your Tasks
              </h2>

              <p className="app-muted text-sm mt-1">
                {filteredTasks.length} task(s) showing
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() =>
                  setShowCreateModal(true)
                }
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300"
              >
                + Create Task
              </button>

              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full md:w-auto p-3 sm:p-4 rounded-xl app-input outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                className="w-full md:w-auto p-3 sm:p-4 rounded-xl app-input outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                value={filterPriority}
                onChange={(e) =>
                  setFilterPriority(
                    e.target.value
                  )
                }
              >
                <option value="All">
                  All Priorities
                </option>
                <option value="High">
                  High
                </option>
                <option value="Medium">
                  Medium
                </option>
                <option value="Low">
                  Low
                </option>
              </select>

              <select
                className="w-full md:w-auto p-3 sm:p-4 rounded-xl app-input outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option value="Newest">
                  Newest
                </option>
                <option value="Oldest">
                  Oldest
                </option>
                <option value="Due Date">
                  Due Date
                </option>
              </select>
            </div>
          </div>

          <KanbanBoard
            tasks={filteredTasks}
            fetchTasks={fetchTasks}
          />
        </section>

        <section
          id="ai"
          className="pt-24 pb-28 scroll-mt-28"
        >
          <div className="app-card p-4 sm:p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  AI Productivity Assistant
                </h2>

                <p className="app-muted mt-1 text-sm sm:text-base">
                  Get smart suggestions based on your
                  current tasks.
                </p>
              </div>

              <button
                onClick={getAISuggestions}
                disabled={aiLoading}
                className="w-full md:w-auto bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition text-sm sm:text-base disabled:opacity-50"
              >
                {aiLoading
                  ? "Generating..."
                  : "Generate Suggestions"}
              </button>
            </div>

            <div className="mt-6 app-soft rounded-xl p-4 sm:p-5 min-h-[120px]">
              {aiLoading ? (
                <p className="app-muted animate-pulse text-sm sm:text-base">
                  AI is analyzing your tasks...
                </p>
              ) : aiSuggestion ? (
                <p className="app-muted whitespace-pre-line leading-relaxed text-sm sm:text-base">
                  {aiSuggestion}
                </p>
              ) : (
                <p className="app-muted text-sm sm:text-base">
                  Click Generate Suggestions to view
                  productivity insights.
                </p>
              )}
            </div>
          </div>
        </section>

        {showCreateModal && (
          <CreateTaskModal
            closeModal={() =>
              setShowCreateModal(false)
            }
            fetchTasks={fetchTasks}
          />
        )}
      </motion.main>
    </div>
  );
}