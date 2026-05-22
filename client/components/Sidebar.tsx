"use client";

import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  BarChart3,
  CheckSquare,
  Bot,
  Menu,
  X,
  LogOut,
} from "lucide-react";

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
        window.scrollY + window.innerHeight / 2;

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
      {/* MOBILE MENU BUTTON */}
      {!open && (
        <button
          type="button"
          onClick={() =>
            setOpen(true)
          }
          className="lg:hidden fixed top-4 left-4 z-[1000] w-10 h-10 rounded-xl bg-white/90 text-black border border-zinc-200 shadow-lg flex items-center justify-center backdrop-blur-md"
        >
          <Menu size={18} />
        </button>
      )}

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 app-card p-6 z-[999] shadow-2xl transition-transform duration-300 shrink-0 flex flex-col overflow-y-auto ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* TOP */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                TaskFlow AI
              </h1>

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
          <div className="mt-12 space-y-4">
            {menuItems.map((item) => {
              const Icon =
                item.icon;

              const isActive =
                active === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    scrollToSection(
                      item.id
                    )
                  }
                  className={`w-full flex items-center gap-3 text-left px-4 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : "app-soft hover:scale-[1.02]"
                  }`}
                >
                  <Icon size={20} />

                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-auto pt-8 space-y-4">
          <div className="bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15 border border-cyan-500/20 p-5 rounded-2xl shadow-lg">
            <p className="font-semibold text-2xl">
              Productivity Boost
            </p>

            <p className="app-muted text-sm mt-2 leading-relaxed">
              Organize smarter with AI-driven task insights.
            </p>
          </div>

          <button
            onClick={logoutHandler}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}