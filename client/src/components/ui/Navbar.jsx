import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textDecoration: "none",
          color: "#007bff",
        }}
      >
        💙 CareConnect
      </Link>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" className="btn outline">
          Home
        </Link>
        <Link to="/auth?redirectToPath=/dashboard" className="btn primary">
          Login
        </Link>
      </div>
    </nav>
  );
}
