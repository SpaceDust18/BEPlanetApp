import express from "express";
import planetRoutes from "./api/planets.js";
import featureRoutes from "./api/features.js";
import userRoutes from "./api/users.js"

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Route registration
app.use("/api/planets", planetRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the BEPlanetApp API!");
});

// 404 handler (for unknown routes)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Central error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message || err);

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

export default app;
