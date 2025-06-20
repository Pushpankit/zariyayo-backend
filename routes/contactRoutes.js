// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact form error:", err.message);
    res.status(500).json({ error: "Failed to send message." });
  }
});

module.exports = router;
