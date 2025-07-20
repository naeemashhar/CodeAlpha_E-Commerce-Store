const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
        error: true,
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
        error: true,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect credentials!",
        success: false,
        error: true,
      });
    }

    // Generate JWT token
    const tokenPayload = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "8h",
    });

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: true,          // Ensure HTTPS
      sameSite: "None",      // Required for cross-site cookies
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    };

    // Send cookie and response
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successfully!",
        data: {
          token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
          },
        },
        success: true,
        error: false,
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: error.message || "Something went wrong during login.",
      success: false,
      error: true,
    });
  }
}

module.exports = userSignInController;
