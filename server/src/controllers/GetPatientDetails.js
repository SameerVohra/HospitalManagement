const Patient = require("../models/PatientModel");

const GetPatientDetails = async(req, res) => {
  const {uhid} = req.query;
  try {
    const patient = await Patient.findOne({uhid_number: uhid});
    if(!patient){
      res.status(404).send("No Such Patient");
      return;
    }
    res.status(201).json({patient})
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
}

module.exports = GetPatientDetails;
