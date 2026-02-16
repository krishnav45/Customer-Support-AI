import React, { useState } from "react";

function ChatMessage({ message, updateRating }) {
  const { id, sender, text, time, rating = 0 } = message;

  const [showStars, setShowStars] = useState(rating > 0);
  const [hoverValue, setHoverValue] = useState(0);

  const handleThumbUp = () => {
    setShowStars(true);
  };

  const handleStarClick = (value) => {
    updateRating(id, value);
  };

  return (
    <div className={`chat-message ${sender === "user" ? "user-message" : "ai-message"}`}>
      
      <div className="avatar">
        <img
          src={sender === "user" ? "/person.bbad1754e7b13b3db5db.png" : "/bot.a2bd3e5c8c207fae6835.png"}
          alt="avatar"
        />
      </div>

      {/* Message Content */}
      <div className="message-content">
        <div className="message-header">
          <strong>
            {sender === "user" ? "You" : "Customer Support AI"}
          </strong>
          <span className="time">{time}</span>
        </div>

        <p className="message-text">{text}</p>

        {sender === "ai" && (
          <div className="feedback-section">
            <div className="feedback-icons">
              <span onClick={handleThumbUp}>👍</span>
              <span>👎</span>
            </div>

            {showStars && (
              <div className="stars">
                <p style={{margin: 0, padding: 0, fontSize: "12px", fontWeight: 400,color: "black"}}>Rate this response:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= (hoverValue || rating) ? "active" : ""
                    }
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
