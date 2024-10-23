const Patient = require("../models/PatientModel.js");

const AddTransaction = async (req, res) => {
  const { amount, discount, uhid } = req.body;

  try {
    console.log(amount, discount)
    const patient = await Patient.findOneAndUpdate(
      { uhid_number: uhid },
      {
        $inc: { amt_payed: amount,
          discount: discount}
      },
      { new: true } 
    );

    console.log(patient.amt_payed)
    console.log(patient.discount)

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).send("Amount Updated Successfully");
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = AddTransaction;
