"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      document.cookie = `token=${data.token}; path=/; max-age=86400`;

      toast.success(
        "Login Successful"
      );

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06121f] via-[#0b1f35] to-[#071018] flex items-center justify-center px-4 py-10 relative overflow-y-auto">

      {/* Glow Effects */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={submitHandler}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            TaskFlow AI
          </h1>

          <p className="text-gray-300 mt-3">
            Login to continue
          </p>
        </div>

        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-white">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-500 transition-all duration-300"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-white">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                className="w-full p-4 pr-12 rounded-2xl bg-black/40 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-500 transition-all duration-300"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 z-10"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-cyan-500"
              />

              <span className="text-gray-300">
                Remember me
              </span>
            </label>

            <button
              type="button"
              className="text-cyan-400 hover:text-cyan-300 transition-all duration-300"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {loading && (
              <Loader2
                size={20}
                className="animate-spin"
              />
            )}

            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          {/* Register */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-300">
              Don&apos;t have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                router.push("/register")
              }
              className="text-cyan-400 font-bold hover:text-cyan-300 transition-all duration-300"
            >
              Register
            </button>
          </div>

        </div>
      </motion.form>
    </div>
  );
}