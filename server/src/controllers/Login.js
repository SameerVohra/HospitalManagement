const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");
const Login = async(req, res) => {
  const {emailId, password} = req.body;
  try {
    if(emailId.trim()==="" || password.trim()===""){
      res.status(401).send("All fields are required");
      return; 
    }
    const admin = await Admin.findOne({emailId});
    const deviceId = uuidv4();

    if(!admin){
      res.status(404).send("Wrong Email/Password");
      return;
    }

    if(admin.session.length>=5){
      admin.session.shift();
    }

    if(admin.password !== password){
      res.status(404).send("Wrong Email/Password");
      return;
    }

    const token = jwt.sign({emailId: emailId, deviceId: deviceId}, process.env.SECRET_KEY, {expiresIn: "24H"});
    admin.session.push(deviceId);
    await admin.save();
    res.status(201).json({emailId: emailId, token: token, deviceId: deviceId});
  } catch (error) {
    console.log(error)
    res.status(501).send("Internal Server Error");
  }
}

module.exports = Login;
