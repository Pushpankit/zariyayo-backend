require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


// ✅ Removed express-async-errors because it's not needed in Express v5

// Optional: Test Cloudinary env config
console.log("✅ Cloudinary config:");
console.log({
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
  secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌",
});

// Init app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const clientRoutes = require("./routes/clientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/upload");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", uploadRoutes); // POST /api/upload
app.use("/api/contact", contactRoutes);

// Test route
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
