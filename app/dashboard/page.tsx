/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, logOut } from "../../lib/firebase";
import { motion } from "framer-motion";

// Import icons from Heroicons.
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  HeartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// Helper function for joining class names.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Navigation items array (defined once)
const navigationItems = [
  "Flirt",
  "Marriage",
  "Language",
  "Culture",
  "Community",
  "Dating Tips",
  "Success Stories",
  "Events",
];

// Updated mock data for stories (users) with 10 users.
const mockStories = [
  { id: 1, name: 'alice', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 2, name: 'bob', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'carol', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 4, name: 'dave', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { id: 5, name: 'eve', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { id: 6, name: 'frank', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
  { id: 7, name: 'grace', avatar: 'https://randomuser.me/api/portraits/women/50.jpg' },
  { id: 8, name: 'heidi', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' },
  { id: 9, name: 'ivan', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 10, name: 'judy', avatar: 'https://randomuser.me/api/portraits/women/40.jpg' },
];

// Mock data for posts.
const mockPosts = [
  {
    id: 1,
    user: {
      name: 'alice',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    image: 'https://picsum.photos/seed/pic1/600/600',
    caption: 'Enjoying a sunny day at the park!',
    likes: 120,
  },
  {
    id: 2,
    user: {
      name: 'bob',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    image: 'https://picsum.photos/seed/pic2/600/600',
    caption: 'Great meal with friends 🍽️',
    likes: 95,
  },
  {
    id: 3,
    user: {
      name: 'carol',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    image: 'https://picsum.photos/seed/pic3/600/600',
    caption: 'Adventure time! #travel',
    likes: 200,
  },
];

export default function InstagramUI() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login if no user is authenticated.
        router.push("/");
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Use Firebase user properties with fallback values.
  const photoURL = currentUser?.photoURL || "https://via.placeholder.com/256";
  const displayName = currentUser?.displayName || "User";
  const email = currentUser?.email || "user@example.com";

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-300 py-4">
        <div className="mx-auto max-w-6xl px-3 lg:px-33 flex items-center justify-between">
          {/* Logo or Brand can be added here */}

          {/* Sliding Navigation */}
          <motion.div 
            ref={containerRef} 
            className="overflow-x-auto scrollbar-hide flex space-x-6 w-full px-4"
            whileTap={{ cursor: "grabbing" }}
          >
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-lg font-semibold text-gray-700 hover:text-black whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Stories Section */}
        <section className="mb-6">
          <div className="flex space-x-4 overflow-x-auto py-2">
            {mockStories.map((story) => (
              <div key={story.id} className="flex flex-col items-center">
                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border-2 border-purple-500 p-1">
                  <img 
                    src={story.avatar} 
                    alt={story.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-xs lg:text-base mt-1">{story.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Feed Section */}
        <section>
          {mockPosts.map((post) => (
            <div key={post.id} className="mb-8 border border-gray-300 rounded-lg bg-white shadow-sm">
              {/* Post Header */}
              <div className="flex items-center p-4">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold">{post.user.name}</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              {/* Post Image */}
              <img 
                src={post.image} 
                alt="Post image" 
                className="w-full object-cover"
              />
              {/* Post Actions */}
              <div className="p-4">
                <div className="flex space-x-4 mb-2">
                  <button aria-label="Like">
                    <HeartIcon className="h-6 w-6 text-gray-600 hover:text-red-500" />
                  </button>
                  <button aria-label="Comment">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 hover:text-black" />
                  </button>
                </div>
                {/* Likes and Caption */}
                <p className="text-sm font-semibold mb-1">{post.likes} likes</p>
                <p className="text-sm">
                  <span className="font-semibold mr-2">{post.user.name}</span>
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Footer with user info and logout button */}
        <section className="mt-10 text-center">
          <div className="flex flex-col items-center space-y-2">
            <img 
              src={photoURL} 
              alt="User avatar" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <p className="text-lg font-bold">{displayName}</p>
            <p className="text-sm text-gray-500">{email}</p>
            <button 
              onClick={logOut} 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
