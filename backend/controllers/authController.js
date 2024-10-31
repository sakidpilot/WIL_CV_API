const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 5, // Iterations
      parallelism: 1,
    });

    // Create the user in the database
    const user = await User.create({ email, password: passwordHash });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordCorrect = await argon2.verify(user.password, password);
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.error("success auth " + token);
    // Return the token
    res.status(200).json({ "token": token, "uid": email });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error", });
  }
};

module.exports = { registerUser, loginUser };
