/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import FirebaseAuthButton from "../components/FirebaseAuthButton";


export default function Home() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Optionally, redirect or notify the user after successful sign-in.
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer block w-full rounded-md bg-white px-3 pt-5 pb-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                placeholder="Email address"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Email address
              </label>
            </div>

            <div className="relative mt-4">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer block w-full rounded-md bg-white px-3 pt-5 pb-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Password
              </label>
            </div>

            <div></div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div>
              <button
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
