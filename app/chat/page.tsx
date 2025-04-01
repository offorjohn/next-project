/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { FaPhone, FaInfoCircle } from "react-icons/fa";

export default function ChatPage() {
  const [userName, setUserName] = useState("Unknown");
  const [userAvatar, setUserAvatar] = useState("/avatar.png");

  type Message = { text: string; sender: "user" | "me" };
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setUserName(searchParams.get("user") || "Unknown");
    setUserAvatar(searchParams.get("avatar") || "/avatar.png");

    const storedMessages = localStorage.getItem(`chat_messages_${userName}`);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error("Error parsing stored messages:", error);
      }
    }
  }, [userName]);

  

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
  
  

  useEffect(() => {
    localStorage.setItem(`chat_messages_${userName}`, JSON.stringify(messages));
  }, [messages, userName]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-gray-200 flex items-center p-3">
        <img src={userAvatar} alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="ml-3 flex-1">
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-sm text-gray-600">Last seen: Just now.</p>
        </div>
        <FaPhone className="text-gray-600 mx-2 cursor-pointer" />
        <FaInfoCircle className="text-gray-600 cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 max-w-xs rounded-lg ${message.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-3 flex items-center border-t">
        <input
          type="text"
          placeholder={`Message ${userName}`}
          value={newMessage}
          onKeyDown={handleKeyPress} // Listen for Enter key
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 outline-none"
        />
        <button className="ml-2 text-gray-500" onClick={() => setMessages([...messages, { text: newMessage, sender: "me" }])}>
          Send
        </button>
      </div>
    </div>
  );
}
