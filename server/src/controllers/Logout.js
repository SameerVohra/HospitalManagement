const Admin = require("../models/AdminModel");

const Logout = async(req, res) => {
  const {email, deviceId} = req.body;
  try {
    const admin = await Admin.findOne({emailId: email});
    console.log(admin.session);
    const newSession = admin.session.filter((id)=>id!==deviceId);
    console.log(newSession);
    admin.session = newSession;
    await admin.save()
    res.status(201).send(admin)
  } catch (error) {
    res.status(501).send("Internal Server Error");
    return ;
  }
}

module.exports = Logout;
