"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen app-bg flex items-center justify-center px-6">
      <div className="app-card max-w-lg w-full p-10 rounded-3xl shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle
              size={42}
              className="text-red-500"
            />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold">
          404
        </h1>

        <h2 className="text-2xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="app-muted mt-4 leading-relaxed">
          The page you are trying to access
          does not exist or may have been
          moved.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          Go To Dashboard
        </Link>
      </div>
    </div>
  );
}