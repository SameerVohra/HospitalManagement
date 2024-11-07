const Patient = require("../models/PatientModel");

const GetPrintedPres = async(req, res) => {
  const {date} = req.query;

  try {
    const presciption = await Patient.find({last_printed_pres: date});
    res.status(201).json({presciption});
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
}

module.exports = GetPrintedPres;
