const express = require("express");
const cors = require("cors");
const app = express();
const Login = require("./controllers/Login.js")
const Verification = require("./middlewares/Verification.js");
const AddPatient = require("./controllers/AddPatient.js");
const AddBillingDetails = require("./controllers/AddBillingDetails.js");
const SearchPatients = require("./controllers/SearchPatients.js");
const GetPatientDetails = require("./controllers/GetPatientDetails.js");
const AddTransaction = require("./controllers/AddTransaction.js");
app.use(express.json());

const corsOption = {
  origin: "*"
}

app.use(cors(corsOption));

app.post("/login", Login)
app.post("/add-patient", Verification, AddPatient)
app.post("/add-bill", Verification, AddBillingDetails);
app.get("/search-patient", Verification, SearchPatients);
app.get("/patient-details", Verification, GetPatientDetails);
app.put("/add-amount", Verification, AddTransaction);

module.exports = app;
