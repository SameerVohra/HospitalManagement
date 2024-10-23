const Patient = require('../models/PatientModel.js')
const SearchPatients = async(req, res) => {
  const {name} = req.query;
  try {
    console.log(name)
    const patients = await Patient.find({
      name: {
        $regex: `^${name}\\b`,
        $options: "i"
      }
    })
    if(patients.length>0){
      res.status(201).json({patients});
      return ;
    }
    res.status(404).send("No patient with the given name");
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
}

module.exports = SearchPatients;
