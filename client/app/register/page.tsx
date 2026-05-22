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

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const { data } =
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
          {
            name,
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
        "Registration Successful"
      );

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06121f] via-[#0b1f35] to-[#071018] flex items-center justify-center px-4 py-10 relative overflow-y-auto">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* REGISTER CARD */}
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
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
      >

        {/* HEADER */}
        <div className="text-center mb-6">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            TaskFlow AI
          </h1>

          <p className="text-gray-300 mt-3">
            Create your account
          </p>

        </div>

        <div className="space-y-5">

          {/* NAME */}
          <div>

            <label className="block mb-2 font-medium text-white">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="auth-input w-full p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all duration-300"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="block mb-2 font-medium text-white">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="auth-input w-full p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all duration-300"
            />

          </div>

          {/* PASSWORD */}
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
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                className="auth-input w-full p-4 pr-12 rounded-2xl outline-none focus:border-cyan-500 transition-all duration-300"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-400 transition-all duration-300 z-10"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* PASSWORD STRENGTH */}
          {password && (
            <div className="space-y-2">

              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    password.length < 6
                      ? "w-1/3 bg-red-500"
                      : password.length <
                        10
                      ? "w-2/3 bg-yellow-500"
                      : "w-full bg-green-500"
                  }`}
                ></div>

              </div>

              <p
                className={`text-xs ${
                  password.length < 6
                    ? "text-red-400"
                    : password.length <
                      10
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {password.length < 6
                  ? "Weak password"
                  : password.length <
                    10
                  ? "Medium password"
                  : "Strong password"}
              </p>

            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <div>

            <label className="block mb-2 font-medium text-white">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
                className="auth-input w-full p-4 pr-12 rounded-2xl outline-none focus:border-cyan-500 transition-all duration-300"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-400 transition-all duration-300 z-10"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* PASSWORD MATCH */}
          {confirmPassword && (
            <p
              className={`text-sm ${
                password ===
                confirmPassword
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {password ===
              confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}

          {/* REGISTER BUTTON */}
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
              ? "Creating account..."
              : "Register"}

          </button>

          {/* LOGIN LINK */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">

            <span className="text-gray-300">
              Already have an
              account?
            </span>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/login"
                )
              }
              className="text-cyan-400 font-bold hover:text-cyan-300 transition-all duration-300"
            >
              Login
            </button>

          </div>

        </div>
      </motion.form>
    </div>
  );
}