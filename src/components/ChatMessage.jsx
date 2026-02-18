import React, { useState } from "react";

function ChatMessage({ message, updateRating, setMessages }) {
  const { id, sender, text, time, rating = 0, feedback = "" } = message;

  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [hoverValue, setHoverValue] = useState(0);
  const [showStars, setShowStars] = useState(rating > 0);

  const handleThumbUp = () => {
    setShowStars(true);
  };

  const handleStarClick = (value) => {
    updateRating(id, value);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) return;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, feedback: feedbackText } : msg
      )
    );

    setFeedbackText("");
    setShowModal(false);
  };

  return (
    <div className={`chat-message ${sender === "user" ? "user-message" : "ai-message"}`}>
      
      <div className="avatar">
        <img
          src={sender === "user"
            ? "/person.bbad1754e7b13b3db5db.png"
            : "/bot.a2bd3e5c8c207fae6835.png"}
          alt="avatar"
        />
      </div>

      <div className="message-content">
        <div className="message-header">
          <strong>
            {sender === "user" ? "You" : "Customer Support AI"}
          </strong>
          <span className="time">{time}</span>
        </div>

        {/* VERY IMPORTANT: plain <p> for Cypress */}
        <p>{text}</p>

        {sender === "ai" && (
          <div className="feedback-section">

            <div className="feedback-icons">
              <span onClick={handleThumbUp}>👍</span>
              <span onClick={() => setShowModal(true)}>👎</span>
            </div>

            {/* Show saved feedback from message object */}
            {feedback && (
              <p>
                <strong>Feedback:</strong> {feedback}
              </p>
            )}

            {showStars && (
              <div className="stars">
                <p style={{ fontSize: "12px", margin: 0 }}>
                  Rate this response:
                </p>

                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= (hoverValue || rating) ? "active" : ""}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}

            {showModal && (
              <div className="feedback-modal-overlay">
                <div className="feedback-modal">
                  <h3>Provide Additional Feedback</h3>

                  <textarea
                    placeholder="Enter your feedback here..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  />

                  <button type="button" onClick={handleSubmitFeedback}>
                    Submit
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
