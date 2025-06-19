require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Test Cloudinary config
console.log("Cloudinary config test:");
console.log({
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
  secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌",
});

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (for local image access if needed)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const clientRoutes = require("./routes/clientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/upload");

app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", uploadRoutes); // POST /api/upload

// Root route for testing
app.get("/", (req, res) => {
  res.send("✅ Zariyayo Backend API is running!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
