const JWT = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    JWT.verify(token, process.env.JSON_WEB_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Invalid Token",
          error: error,
        });
      } else {
        req.user_id = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth Middleware",
      error: error,
    });
  }
};
