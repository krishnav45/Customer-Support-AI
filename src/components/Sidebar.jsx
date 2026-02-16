import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">

      <div className="logo-section"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="newchat.8638cbe1684b4a30a532.png"
            alt="logo"
            style={{ width: "40px", borderRadius: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            New Query?
          </span>
        </div>

        <span style={{ fontSize: "20px", cursor: "pointer" }}>＋</span>
      </div>

      <div className="sidebar-content">
        <button
          className="history-btn"
          onClick={() => navigate("/history")}
        >
          Past Conversations
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
