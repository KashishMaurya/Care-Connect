require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// SuperTokens setup
const supertokens = require("supertokens-node");
const {
  middleware,
  errorHandler,
} = require("supertokens-node/framework/express");
const { getAllCORSHeaders } = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

// Initialize SuperTokens BEFORE creating Express app
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://try.supertokens.com",
  },
  appInfo: {
    appName: "CareConnect",
    apiDomain: process.env.API_DOMAIN || "http://localhost:5000", //backend
    apiBasePath: "/auth",
    websiteDomain: process.env.WEBSITE_DOMAIN || "http://localhost:5173", //frontend
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    Session.init({
      cookieSecure: false,
    }),
  ],
});

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://digital-id-three.vercel.app",
  process.env.WEBSITE_DOMAIN,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["content-type", ...getAllCORSHeaders()],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SuperTokens middleware - MUST come before your routes
app.use(middleware());

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "CareConnect API is running",
    version: "1.0.0",
    status: "healthy",
  });
});

// Custom routes - MUST come after SuperTokens middleware
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profiles", require("./routes/profileRoutes"));

// SuperTokens error handler - MUST come after your routes
app.use(errorHandler());

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    msg: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API: http://localhost:${PORT}`);
      console.log(`Auth: http://localhost:${PORT}/auth`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
  // Don't exit - just log the error
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Don't exit - just log the error
});