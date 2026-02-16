import React from "react";
import { useNavigate } from "react-router-dom";

const quickOptions = [
  {
    title: "Hello",
    subtitle: "Get immediate AI generated response",
  },
  {
    title: "My order has not arrived yet.",
    subtitle: "Get immediate AI generated response",
  },
  {
    title: "How can I reset my password?",
    subtitle: "Get immediate AI generated response",
  },
  {
    title: "I am unable to log in to my account.",
    subtitle: "Get immediate AI generated response",
  },
];

const QuickReplies = () => {
  const navigate = useNavigate();

  const handleClick = (message) => {
    navigate("/chat", { state: { message } });
  };

  return (
    <div className="quick-grid">
      {quickOptions.map((item, index) => (
        <div
          key={index}
          className="quick-card"
          onClick={() => handleClick(item.title)}
        >
          <div>
            <h4>{item.title}</h4>
            <p>{item.subtitle}</p>
          </div>
          <span className="arrow">↗</span>
        </div>
      ))}
    </div>
  );
};

export default QuickReplies;
