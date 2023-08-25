const express=require("express")
const dbConnection= require("./db/db")
const authRoute = require("./Routes/authRoute")
const cors =require("cors")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/",authRoute) 
 





dbConnection()
const port=8999
app.listen(port,()=>{
    console.log("app listening in port "+ port)
})