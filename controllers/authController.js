const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc Register new user
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this phone number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      cart: [],
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "✅ Registered successfully",
      user: {
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        phone: savedUser.phone,
        cart: savedUser.cart,
      },
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc Login existing user
exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      message: "✅ Login successful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        cart: user.cart,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc Update user's cart in DB
exports.updateUserCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId || !Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Invalid cart update request" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cart: cartItems },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found while updating cart" });
    }

    res.status(200).json({
      message: "✅ Cart updated",
      cart: updatedUser.cart,
    });
  } catch (err) {
    console.error("❌ Cart update error:", err);
    res.status(500).json({ message: "Server error while updating cart" });
  }
};

// @desc Get user from Firebase phone/email
exports.getUserByPhoneOrEmail = async (req, res) => {
  try {
    const { phone, email } = req.query;

    if (!phone && !email) {
      return res.status(400).json({ message: "Phone or email is required" });
    }

    const query = {};
    if (phone) query.phone = phone;
    if (email) query.email = email;

    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      cart: user.cart,
    });
  } catch (err) {
    console.error("❌ Fetch user error:", err);
    res.status(500).json({ message: "Server error while fetching user" });
  }
};
