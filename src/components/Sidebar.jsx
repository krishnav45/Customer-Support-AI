import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
<div className="close-btn" onClick={() => setSidebarOpen(false)}>
  ✕
</div>
{sidebarOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setSidebarOpen(false)}
  />
)}


      {/* New Query Link */}
      <Link to="/" className="logo-section" style={{ textDecoration: "none", color: "inherit" }}>
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

        <span style={{ fontSize: "20px" }}>＋</span>
      </Link>

      <div className="sidebar-content">
        {/* Past Conversations Link */}
        <Link to="/history" className="history-btn">
          Past Conversations
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;
