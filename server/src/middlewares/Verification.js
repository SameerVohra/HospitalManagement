const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

const Verification = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findOne({ emailId: decoded.emailId });
 
    if (!admin || !admin.session.includes(decoded.deviceId)) {
      return res.status(401).send("Unauthorized: Invalid or expired session");
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).send("Invalid or Expired Token");
  }
};

module.exports = Verification;
