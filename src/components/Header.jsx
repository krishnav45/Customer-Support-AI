import React, { useEffect, useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState("light");

  // Load saved theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.body.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="header">
      <h2>Customer Support AI</h2>
      <span className="light-text" onClick={toggleTheme} style={{cursor:"pointer"}}>
        {theme === "light" ? "Light" : "Dark"} ⚙
      </span>
    </div>
  );
};

export default Header;
