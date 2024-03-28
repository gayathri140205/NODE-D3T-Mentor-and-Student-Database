const mongoose = require("mongoose");
const URI= "mongodb://localhost:27017/taskee3";

function connectToDatabase(){
   mongoose
   .connect (URI)
   .then((response)=>{
      if (response) console.log("database connection successful");
   })
   .catch((err)=> console.log("database connection failed",err));
}
module.exports ={
  connectToDatabase,
};