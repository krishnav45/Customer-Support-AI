import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const HistoryPage = () => {
  const [selectedRating, setSelectedRating] = useState("All");
  const chatHistory =
    JSON.parse(localStorage.getItem("chatHistory")) || [];

  const getDayLabel = (dateString) => {
    const today = new Date();
    const chatDate = new Date(dateString);

    const diffTime = today - chatDate;
    const diffDays = Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today's chats";
    if (diffDays === 1) return "Yesterday's chats";
    return chatDate.toLocaleDateString();
  };
  const filteredHistory =
  selectedRating === "All"
    ? chatHistory
    : chatHistory.filter((chat) =>
        chat.messages.some(
          (msg) =>
            msg.sender === "ai" &&
            msg.rating === Number(selectedRating)
        )
      );


  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-section">
        <Header />

        <div className="history-page">
          <div className="history-container">

            <h2 className="history-title">
              Conversation History
            </h2>

            <div className="filter-section">
              <label>Filter by rating</label>
              <select
  value={selectedRating}
  onChange={(e) => setSelectedRating(e.target.value)}
>
                <option value="All">All Ratings</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            {filteredHistory.length === 0 ? (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
      fontWeight: "500",
      fontSize: "16px",
      backgroundColor: "white",
      borderRadius: "8px",
    }}
  >
    No such chats.
  </div>
) : (
  filteredHistory.map((chat) => (

              <div key={chat.id}>
                <h3 className="section-heading">
                  {getDayLabel(chat.date)}
                </h3>

                {chat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="history-card"
                  >
                    <img
                      src="/person.bbad1754e7b13b3db5db.png"
                      className="history-avatar"
                      alt=""
                    />

                    <div className="history-content">
                      <div className="history-name">
                        {msg.sender === "user"
                          ? "You"
                          : "Customer Support AI"}
                      </div>

                      <div>{msg.text}</div>

                      <div className="history-time">
                        {msg.time}
                      </div>

                      {/* Show rating if exists */}
                      {msg.rating > 0 && (
                        <div className="history-stars">
                          {"★".repeat(msg.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default HistoryPage;
