/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Profile() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const postData = searchParams.get("post") ? JSON.parse(searchParams.get("post")!) : null;

  if (!postData) {
    return <div className="flex justify-center items-center h-screen">No post found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Main Profile Container */}
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Top Section */}
        <div className="relative bg-gradient-to-r from-purple-300 via-pink-200 to-blue-200 h-32 flex justify-center items-center">
          <div className="absolute -bottom-8 w-16 h-16 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
            <img src={postData.user.avatar} alt="User avatar" className="w-full object-cover" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-12 px-6 pb-4 text-center">
          <h1 className="text-xl font-semibold">{postData.user.name}</h1>
          <p className="text-sm text-gray-500">{postData.caption}</p>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center space-x-4 mt-4">
            <div className="text-center">
              <p className="text-sm font-semibold">{postData.likes}</p>
              <p className="text-xs text-gray-400">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">25</p>
              <p className="text-xs text-gray-400">Age</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">Aim</p>
              <p className="text-xs text-gray-400">Label</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center space-x-4 mt-6">
          <button
  className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
  onClick={() => router.push(`/chat?user=${encodeURIComponent(postData.user.name)}&avatar=${encodeURIComponent(postData.user.avatar)}`)}
>
  Chat
</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition">
              Video Call
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600 transition">
              Voice Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
