const mongoose=require("mongoose")
const employeeSchema = new mongoose.Schema({
    f_Name: { 
        type: String,
         required: true
         },
    f_Email: {
         type: String, 
         required: true,
          unique: true },
    f_Mobile: { type: Number,
         required: true
         },
    f_Designation: { 
        type: String, 
        required: true
     },
    f_Gender: {
         type: String,
         required: true
         },
    f_Course: { 
        type: String,
         required: true 
        },
    f_Image: {
         type: String,
         default:"https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg"
     },
  },{
     timestamps:true
  });
  const Employee=mongoose.model("Employee",employeeSchema)
  module.exports = Employee;