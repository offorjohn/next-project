"use client"; // if using the App Router

import { useState, useEffect } from "react";
import { auth, signIn, logOut } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function FirebaseAuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Navigate to dashboard when the user logs in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return user ? (
    <div>
      <p className="text-lg font-bold">Welcome, {user.displayName}</p>
      <button onClick={logOut} className="p-2 bg-red-500 text-white rounded-md">
        Logout
      </button>
    </div>
  ) : (
    <button
      onClick={signIn}
      className="rounded-md bg-white border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100 flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
        <path
          fill="#4285F4"
          d="M23.49 12.29c2.14-2.14 5.04-3.56 8.23-3.56 4.69 0 8.46 2.45 10.44 5.73l-4.75 3.77c-1.02-1.97-3.18-3.35-5.69-3.35-3.47 0-6.48 2.52-6.48 5.89 0 .49.08.96.21 1.41L15.3 20.2c-1.1-2.11-1.8-4.65-1.8-7.33 0-2.64.72-5.11 1.97-7.28l4.9 3.83c-.48 1.32-.77 2.74-.77 4.17 0 1.51.26 2.94.76 4.24l.03-.05z"
        />
        <path
          fill="#34A853"
          d="M46.5 24.42c0-.72-.06-1.41-.15-2.09H24v4.16h12.91c-.59 3.02-2.37 5.56-4.92 7.31v6.01h7.91c4.64-4.3 7.32-10.7 7.32-17.39z"
        />
        <path
          fill="#FBBC05"
          d="M24 48c6.3 0 11.61-2.07 15.46-5.61l-7.91-6.01c-2.13 1.46-4.9 2.33-7.55 2.33-5.76 0-10.67-3.82-12.42-8.99H2.04v6.17C6.11 41.23 14.26 48 24 48z"
        />
        <path
          fill="#EA4335"
          d="M11.58 28.72c-.53-1.61-.83-3.31-.83-5.08s.3-3.47.83-5.08V9.4H2.04A23.89 23.89 0 000 24c0 3.81.88 7.42 2.44 10.6l9.14-5.88z"
        />
      </svg>
      <span className="text-gray-700 text-sm font-semibold">Sign in with Google</span>
    </button>
  );
}
