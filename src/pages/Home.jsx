import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import QuickReplies from "../components/QuickReplies";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleAsk = () => {
  if (!query.trim()) return;

  navigate("/chat", {
    state: { message: query }
  });

  setQuery("");
};


  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-section">
        <Header />

        <div className="content">
          <h2 className="welcome">
            Hi, Please tell me your query!
          </h2>

          <div className="avatar">
            <img
              src="person.bbad1754e7b13b3db5db.png"
              alt="bot"
            />
          </div>

          <QuickReplies setQuery={setQuery} />

          <div className="input-section">
            <input
              type="text"
              placeholder="Please tell me about your query!"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="ask-btn" onClick={handleAsk}>Ask</button>
            <button className="save-btn" disabled>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
