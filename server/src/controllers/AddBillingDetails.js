const Patient = require("../models/PatientModel.js");
const AddDescription = async(req, res) => {
  const {category, subcategory, unit, rate, bill_number, date } = req.body;
  try {
    const bill = await Patient.findOne({bill_number});
    
    if(!bill){
      res.status(404).send("No patient found");
      return ;
    }

    const amount = unit*rate
    const newSubCategory = {
      subcategory,
      unit,
      rate, 
      amount,
      date
    }

    const existingCategory = bill.bill_details.find(b=>b.category===category);
    if(existingCategory){
      existingCategory.subcategories.push(newSubCategory);
    }
    else{
      const newBill = {
        category: category,
        subcategories: [newSubCategory]
      }

      bill.bill_details.push(newBill);
    }
    await bill.save();
    res.status(201).send("Added");
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
}

module.exports = AddDescription;
