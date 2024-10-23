const Patient = require("../models/PatientModel");

const DischargePatient = async(req, res) => {
  const {uhid, disDate, disTime} = req.body;
  try {
    const patient = await Patient.findOneAndUpdate({uhid_number: uhid}, {
      discharge_date: disDate,
      discharge_time: disTime
    }, {new: true})
    if(!patient){
      res.status(404).send("No such patient found");
      return;
    }

    res.status(201).send("Patient Discharged");
  } catch (error) {
    res.status(501).send("Internal Server Error");
    return ;
  }
}

module.exports = DischargePatient;
