import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatMessage from "../components/ChatMessage";

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const clickedMessage = location.state?.message || "";

  // Generate unique conversation ID
  const conversationId = location.key || Date.now();

  // Get current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // AI Response Logic
const getAIResponse = (message) => {
  const cleanedMessage = message.trim().toLowerCase();

  const responses = {
    "hello": "Hello! How can I assist you today?",
    "my order has not arrived yet.":
      "Please check your order status in the 'My Orders' section of your account. If the estimated delivery date has passed, kindly contact our support team with your order number.",
    "how can i reset my password?":
      "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.",
    "i am unable to log in to my account.":
      "Ensure that you are using the correct email and password. If the issue persists, try resetting your password or clearing your browser cache.",
  };

  return (
    responses[cleanedMessage] ||
    "Sorry, Did not understand your query!"
  );
};


  // Initial Messages
  const [messages, setMessages] = useState(() => {
    if (!clickedMessage) return [];

    const timeNow = getCurrentTime();

    return [
      {
        id: 1,
        sender: "user",
        text: clickedMessage,
        time: timeNow
      },
      {
        id: 2,
        sender: "ai",
        text: getAIResponse(clickedMessage),
        time: timeNow,
        rating: 0
      }
    ];
  });

  const [input, setInput] = useState("");

  // Handle Ask Button
  const handleAsk = () => {
    if (!input.trim()) return;

    const timeNow = getCurrentTime();

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: timeNow
    };

    const aiMessage = {
      id: Date.now() + 1,
      sender: "ai",
      text: getAIResponse(input),
      time: timeNow,
      rating: 0
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  // Update Rating
  const updateRating = (id, value) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, rating: value } : msg
      )
    );
  };

  // Save Conversation to localStorage
  useEffect(() => {
    if (messages.length === 0) return;

    const existingHistory =
      JSON.parse(localStorage.getItem("chatHistory")) || [];

    const conversation = {
      id: conversationId,
      date: new Date().toISOString(),
      messages: messages
    };

    // Remove previous version of same conversation
    const updatedHistory = existingHistory.filter(
      (chat) => chat.id !== conversationId
    );

    localStorage.setItem(
      "chatHistory",
      JSON.stringify([conversation, ...updatedHistory])
    );
  }, [messages, conversationId]);

  return (
    <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <div className="main-section">
        <Header />

        <div className="chat-container">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              updateRating={updateRating}
            />
          ))}
        </div>

        <div className="input-section">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Anything Else?"
          />
          <button type="submit" className="ask-btn" onClick={handleAsk}>
            Ask
          </button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
