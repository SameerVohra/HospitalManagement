const mongoose  = require("mongoose");
const app = require("./app.js");
require("dotenv").config();

const port = 3000;
const dbUrl = process.env.DB_URI;

mongoose
  .connect(dbUrl)
  .then(()=>console.log("Connected To Database Sucessfully"))
  .catch((error)=>console.log(`Error connecting to DB: ${error}`))

app.listen(port, ()=>{
  console.log(`Listening to Port: ${port}`)
})
