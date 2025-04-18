/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import Link from "next/link";
import FirebaseAuthButton from "../components/FirebaseAuthButton";

import { FiMail, FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-39 lg:px-8">
      {/* ToastContainer added for displaying toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="font flex items-center px-20 gap-2 whitespace-nowrap text-lg sm:text-xl">
            Welcome back
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              height="26"
              width="26"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.4"
            >
              <path d="M13 15H7a1 1 0 0 1-1-1v-1.5h1v1.5h6V2H7v1.5H6V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1Z" />
              <path d="M7.5 10.5l2-2H2v-1h7.5l-2-2 .7-.7 3 3-3 3-.7-.7Z" />
            </svg>
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer block w-full rounded-md bg-white pl-10 pr-3 pt-5 pb-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                placeholder="Email address"
              />
              <label
                htmlFor="email"
                className="absolute left-10 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer block w-full rounded-md bg-white pl-10 pr-3 pt-5 pb-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-10 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Password
              </label>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Login Button */}
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ backgroundColor: "#415a77" }}
              >
                Log in
              </button>
            </div>

            <FirebaseAuthButton />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link href="/register">
              <span className="font-semibold" style={{ color: "#778da9" }}>
                Create new account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
