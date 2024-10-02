const mongoose = require("mongoose");
const ConnectDB = async () =>{
    await mongoose.connect("mongodb://localhost:27017/register");
    console.log("conneted successfully");
}
module.exports = ConnectDB;