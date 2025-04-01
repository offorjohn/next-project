/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaPhone, FaInfoCircle } from "react-icons/fa";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("user") || "Unknown";
  const userAvatar = searchParams.get("avatar") || "/avatar.png"; // Default avatar

  type Message = { text: string; sender: "user" | "me" };

  // State to hold messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false); // Track component mount status

  // Load messages from localStorage when component mounts
  useEffect(() => {
    setIsMounted(true); // Ensure we only access localStorage on the client
    if (typeof window !== "undefined" && userName) {
      const storedMessages = localStorage.getItem(`chat_messages_${userName}`);
      if (storedMessages) {
        try {
          setMessages(JSON.parse(storedMessages));
        } catch (error) {
          console.error("Error parsing stored messages:", error);
        }
      }
    }
  }, [userName]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isMounted && typeof window !== "undefined" && userName) {
      localStorage.setItem(`chat_messages_${userName}`, JSON.stringify(messages));
    }
  }, [messages, isMounted, userName]);

  // Handle message input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessages: Message[] = [...messages, { text: newMessage, sender: "me" }];
      setMessages(newMessages); // Update state
      setNewMessage(""); // Clear input
    }
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gray-200 flex items-center p-3">
        <img src={userAvatar} alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="ml-3 flex-1">
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-sm text-gray-600">Last seen: Just now.</p>
        </div>
        <FaPhone className="text-gray-600 mx-2 cursor-pointer" />
        <FaInfoCircle className="text-gray-600 cursor-pointer" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 max-w-xs rounded-lg ${message.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white p-3 flex items-center border-t">
        <input
          type="text"
          placeholder={`Message ${userName}`}
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Listen for Enter key
          className="flex-1 border rounded-full px-4 py-2 outline-none"
        />
        <button className="ml-2 text-gray-500" onClick={handleSendMessage}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-8.486 8.486m0 0l-4.243-4.243a2.828 2.828 0 114 4l4.243 4.243m4.243-4.243l8.486-8.486a2.828 2.828 0 10-4-4l-8.486 8.486z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
