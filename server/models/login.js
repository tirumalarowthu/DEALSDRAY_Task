const mongoose=require("mongoose")
const loginSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})
const Admin= mongoose.model("Admin",loginSchema)
module.exports=Admin