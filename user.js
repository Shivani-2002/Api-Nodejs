const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    ph: Number,
    userType: String,
})

const userModel = mongoose.model("Users",userSchema);

module.exports = userModel;