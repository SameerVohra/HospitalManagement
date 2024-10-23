const mongoose = require("mongoose");

const AdminModel = new mongoose.Schema({
  emailId: String,
  password: String,
  session: [String]
})

const Admin = mongoose.model("Admin", AdminModel);
module.exports = Admin;
