import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#284868",
        color: "white",
        padding: "3rem 2rem",
        marginTop: "4rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h3 style={{ marginBottom: "1rem" }}>💙 CareConnect</h3>
        <p style={{ marginBottom: "1rem", color: "#bdc3c7" }}>
          Keeping your loved ones safe with digital identity solutions
        </p>
        <p style={{ marginBottom: "1rem", color: "#bdc3c7" }}>
          Wishing safety and care for every soul — with compassion, Kashish
          Maurya 🌼
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/learn-more"
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            Learn More
          </a>
          <a href="/auth" style={{ color: "#3498db", textDecoration: "none" }}>
            Get Started
          </a>
          <a href="#" style={{ color: "#3498db", textDecoration: "none" }}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: "#3498db", textDecoration: "none" }}>
            Terms of Service
          </a>
        </div>
        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#95a5a6" }}>
          © {new Date().getFullYear()} CareConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}