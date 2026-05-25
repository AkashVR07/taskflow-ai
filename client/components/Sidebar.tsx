"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  LayoutDashboard,
  BarChart3,
  CheckSquare,
  Bot,
  Menu,
  X,
  LogOut,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
  },
  {
    id: "ai",
    label: "AI Assistant",
    icon: Bot,
  },
];

export default function Sidebar() {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [active, setActive] =
    useState("dashboard");

  const scrollToSection = (
    id: string
  ) => {
    const section =
      document.getElementById(id);

    if (!section) return;

    const yOffset = -90;

    const y =
      section.getBoundingClientRect()
        .top +
      window.scrollY +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setActive(id);
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY +
        window.innerHeight / 2;

      for (const item of menuItems) {
        const section =
          document.getElementById(
            item.id
          );

        if (!section) continue;

        const top =
          section.offsetTop;

        const bottom =
          top +
          section.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < bottom
        ) {
          setActive(item.id);
          break;
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem(
      "userInfo"
    );

    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.push("/login");
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      {!open && (
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() =>
            setOpen(true)
          }
          className="lg:hidden fixed top-4 left-4 z-[1000] w-11 h-11 rounded-2xl bg-white/90 text-black border border-zinc-200 shadow-2xl flex items-center justify-center backdrop-blur-xl"
        >
          <Menu size={20} />
        </motion.button>
      )}

      {/* MOBILE OVERLAY */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() =>
            setOpen(false)
          }
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[998]"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 app-card border-r border-white/10 z-[999] shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-transform duration-300 flex flex-col overflow-hidden ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* BACKGROUND EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full p-6 overflow-y-auto">

          {/* TOP */}
          <div>

            {/* LOGO */}
            <div className="flex items-start justify-between gap-4">

              <div>
                <motion.h1
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="text-4xl font-black leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                >
                  TaskFlow AI
                </motion.h1>

                <p className="app-muted mt-2 text-sm">
                  Smart Productivity SaaS
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                className="lg:hidden app-soft w-10 h-10 rounded-xl flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            {/* MENU */}
            <div className="mt-12 space-y-3">

              {menuItems.map((item) => {
                const Icon =
                  item.icon;

                const isActive =
                  active === item.id;

                return (
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      x: 3,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    key={item.id}
                    onClick={() =>
                      scrollToSection(
                        item.id
                      )
                    }
                    className={`relative w-full flex items-center gap-4 text-left px-5 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.45)]"
                        : "app-soft hover:border-cyan-500/20"
                    }`}
                  >

                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-white/15"
                          : "bg-white/5"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="text-[15px]">
                      {item.label}
                    </span>

                  </motion.button>
                );
              })}

            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-auto pt-8 space-y-5">

            {/* PRODUCTIVITY CARD */}
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="relative overflow-hidden bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15 border border-cyan-500/20 p-5 rounded-3xl shadow-xl"
            >

              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-400/10 blur-3xl rounded-full" />

              <div className="relative z-10">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg mb-4">
                  <Sparkles size={22} />
                </div>

                <p className="font-bold text-2xl leading-tight">
                  Productivity Boost
                </p>

                <p className="app-muted text-sm mt-3 leading-relaxed">
                  Organize smarter with AI-driven insights and task automation.
                </p>

              </div>
            </motion.div>

            {/* LOGOUT */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={logoutHandler}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-xl hover:shadow-red-500/30 transition-all duration-300"
            >
              <LogOut size={18} />
              Logout
            </motion.button>

          </div>
        </div>
      </aside>
    </>
  );
}