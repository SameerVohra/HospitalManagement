const Patient = require("../models/PatientModel");

const UpdatePrintDate = async(req, res) => {
  const {uhid_number, updated_date} = req.body;

  try {
    const patient = await Patient.findOne({uhid_number: uhid_number});
    if(!patient){
      res.status(404).send("No Such Patient");
      return;
    }

    patient.last_printed_pres = updated_date;
    await patient.save();
    res.status(201).send("Updated Successfully");
  } catch (error) {
    res.status(501).send("Internal Server Error");
    return ;
  }
}

module.exports = UpdatePrintDate;
