const mongoose=require('mongoose')
const dbConnection=async()=>{
    try{
        await mongoose.connect('mongodb+srv://veera123:veera123@cluster0.d2xilje.mongodb.net/dealsdray?retryWrites=true&w=majority')
        console.log("db connected successfully")
    }catch(err){
        console.log(err.message)
    }
}
module.exports=dbConnection