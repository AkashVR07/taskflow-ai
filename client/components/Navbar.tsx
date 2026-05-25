"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Bell,
  Moon,
  Sun,
  Search,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { darkMode, toggleTheme } =
    useTheme();

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [openProfile, setOpenProfile] =
    useState(false);

  const [
    openNotifications,
    setOpenNotifications,
  ] = useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.push("/login");
  };

  return (
    <header className="relative z-[999] w-full mb-8">
      <div className="app-card rounded-3xl p-4 sm:p-5 border border-white/10 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

          {/* LEFT */}
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back 👋
            </h1>

            <p className="app-muted mt-1 text-sm">
              {user?.name ||
                "TaskFlow User"}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

            {/* SEARCH */}
            <div className="relative w-full sm:w-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-72 pl-11 pr-4 py-3 rounded-2xl app-input outline-none focus:border-cyan-500 transition-all duration-300"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">

              {/* NOTIFICATIONS */}
              <div
                className="relative"
                ref={notificationRef}
              >
                <button
                  onClick={() => {
                    setOpenNotifications(
                      !openNotifications
                    );
                    setOpenProfile(false);
                  }}
                  className="relative app-soft w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300"
                >
                  <Bell size={20} />

                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>

                <AnimatePresence>
                  {openNotifications && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={`absolute right-0 top-16 w-80 rounded-2xl border shadow-2xl overflow-hidden z-[9999] backdrop-blur-2xl ${
                        darkMode
                          ? "bg-[#111827]/95 border-white/10 text-white"
                          : "bg-white/95 border-slate-200 text-slate-900"
                      }`}
                    >
                      <div
                        className={`p-4 border-b ${
                          darkMode
                            ? "border-white/10"
                            : "border-slate-200"
                        }`}
                      >
                        <h3 className="font-semibold">
                          Notifications
                        </h3>

                        <p
                          className={
                            darkMode
                              ? "text-sm text-gray-400 mt-1"
                              : "text-sm text-slate-500 mt-1"
                          }
                        >
                          Recent task updates
                        </p>
                      </div>

                      <div className="p-3 space-y-3">
                        <div className="app-soft p-3 rounded-xl">
                          <p className="text-sm font-semibold">
                            Task Reminder
                          </p>

                          <p className="text-xs app-muted mt-1">
                            You have pending tasks to complete.
                          </p>
                        </div>

                        <div className="app-soft p-3 rounded-xl">
                          <p className="text-sm font-semibold">
                            AI Suggestion Ready
                          </p>

                          <p className="text-xs app-muted mt-1">
                            Generate insights for better productivity.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* THEME */}
              <button
                onClick={toggleTheme}
                className="app-soft w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300"
              >
                {darkMode ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              {/* PROFILE */}
              <div
                className="relative"
                ref={profileRef}
              >
                <button
                  onClick={() => {
                    setOpenProfile(
                      !openProfile
                    );
                    setOpenNotifications(false);
                  }}
                  className="flex items-center gap-3 app-soft px-4 py-2 rounded-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {user?.name
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "U"}
                  </div>

                  <div className="hidden sm:block text-left">
                    <p className="font-semibold text-sm">
                      {user?.name ||
                        "User"}
                    </p>

                    <p className="text-xs app-muted">
                      Pro Member
                    </p>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      openProfile
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={`absolute right-0 top-16 w-64 rounded-2xl border shadow-2xl overflow-hidden z-[9999] backdrop-blur-2xl ${
                        darkMode
                          ? "bg-[#111827]/95 border-white/10 text-white"
                          : "bg-white/95 border-slate-200 text-slate-900"
                      }`}
                    >
                      <div
                        className={`p-4 border-b ${
                          darkMode
                            ? "border-white/10"
                            : "border-slate-200"
                        }`}
                      >
                        <p className="font-semibold text-base">
                          {user?.name}
                        </p>

                        <p
                          className={
                            darkMode
                              ? "text-sm text-gray-400 mt-1"
                              : "text-sm text-slate-500 mt-1"
                          }
                        >
                          {user?.email}
                        </p>
                      </div>

                      <div className="p-2 space-y-1">
                        <button
                          onClick={() => {
                            setOpenProfile(false);
                            router.push("/profile");
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out text-left ${
                            darkMode
                              ? "hover:bg-cyan-500/10"
                              : "hover:bg-cyan-100"
                          }`}
                        >
                          <User size={18} />
                          <span className="font-medium">
                            Profile
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setOpenProfile(false);
                            router.push("/settings");
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out text-left ${
                            darkMode
                              ? "hover:bg-cyan-500/10"
                              : "hover:bg-cyan-100"
                          }`}
                        >
                          <Settings size={18} />
                          <span className="font-medium">
                            Settings
                          </span>
                        </button>

                        <button
                          onClick={logoutHandler}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200 ease-out text-left"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">
                            Logout
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
}