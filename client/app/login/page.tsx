"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

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
    <div className="min-h-screen app-bg flex items-center justify-center px-4 py-10">
      <motion.form
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        onSubmit={submitHandler}
        className="app-card w-full max-w-md p-8 rounded-3xl shadow-2xl border border-[var(--border-main)]"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            TaskFlow AI
          </h1>

          <p className="app-muted mt-3">
            Login to continue
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-2xl app-input outline-none focus:border-cyan-500 transition-all duration-300"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-2xl app-input outline-none focus:border-cyan-500 transition-all duration-300"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          <div className="text-center mt-5">
            <span className="app-muted text-sm">
              Don&apos;t have an account?{" "}
            </span>

            <button
              type="button"
              onClick={() =>
                router.push("/register")
              }
              className="text-cyan-400 font-bold hover:underline"
            >
              Register
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}