const mongoose = require("mongoose");


function connectToDatabase(){
    const URI = 
    process.env.NODE_ENV === "  production"
     ?process.env.MONGODB_URI
     :"mongodb://localhost:27017/taskee3";
    console.log(process.env.NODE_ENV);
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