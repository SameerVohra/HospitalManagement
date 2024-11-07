const mongoose = require("mongoose");

const SubCategoryModel = new mongoose.Schema({
  subcategory: String,
  unit: Number,
  rate: Number,
  amount: Number,
  date: Date
})

const BillingModel = new mongoose.Schema({
  category: String,
  subcategories: [SubCategoryModel],
  gross_amount: Number,
  discount: Number,
  total_amount: Number
})

const PatientModel = new mongoose.Schema({
  name: String,
  guardian_name: String,
  gender: String,
  age: Number,
  address: String,
  mobile_number: String,
  consultant_doctor: String,
  bill_number: Number, // automatic
  uhid_number: Number, // four digit number
  ipd_number: Number, // manual
  room_number: Number,
  room_category: String,
  patient_status: String,
  bill_date: Date,
  admit_date: Date,
  admit_time: String,
  discharge_date: Date,
  discharge_time: String,
  total_days: Number, // dischargedate - admitdate
  bill_details: [BillingModel],
  amt_payed: Number,
  discount: Number,
  last_printed_pres: String,
});

const Patient = mongoose.model("Patient", PatientModel);
module.exports = Patient;
