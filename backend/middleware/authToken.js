const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: "Login Required !",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log(err);
      }
      req.userId = decoded?._id;

      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
