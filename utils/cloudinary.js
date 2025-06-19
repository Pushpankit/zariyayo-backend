const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

// Load .env
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optional: Confirm configuration at startup
console.log("📸 Cloudinary configured:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
  secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌",
});

module.exports = cloudinary;
