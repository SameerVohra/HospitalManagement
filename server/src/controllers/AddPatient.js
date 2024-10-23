const Patient = require("../models/PatientModel");

const generateUhid = () => {
  const mod = Math.round(Math.random()*10_000_000);
  const uhid_number = Date.now()%10_000_000 + mod;
  return uhid_number;
}

const AddPatient = async(req, res) => {
  const {name, guardian_name, age, gender, address, mobile_number, consultant_doctor, ipd_number, room_number, room_category, patient_status, bill_date, admit_date, admit_time, discharge_date, discharge_time, amt_payed, discount} = req.body;
  try {
    let uhid_number = generateUhid();
    const bill_count = await Patient.countDocuments();
    const bill_number = bill_count+1;
    console.log(uhid_number);
    let isUnique = false;
    while(!isUnique){
      const patient = await Patient.findOne({uhid_number});
      if(patient){
        uhid_number = generateUhid();
      }
      else{
        isUnique = true;
      }
    }
    const newPatient = new Patient({
      name, guardian_name, age, gender, address, mobile_number, consultant_doctor, bill_number, uhid_number, ipd_number, room_number, room_category, patient_status, bill_date, admit_date, admit_time, discharge_date, discharge_time, amt_payed, discount
    })
    await newPatient.save();
    res.status(201).json({uhid_number, bill_number});
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
}

module.exports = AddPatient;
