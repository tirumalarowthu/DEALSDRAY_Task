const express=require("express")
const dbConnection= require("./db/db")
const authRoute = require("./Routes/authRoute")
const cors =require("cors")
const employeeRoute = require("./Routes/employeeRoute")
const app=express()
app.use(express.json())
app.use(cors())

//for authentiacation
app.use("/",authRoute) 
//for create new user
app.use("/",employeeRoute)
 





dbConnection()
const port=8999
app.listen(port,()=>{
    console.log("app listening in port "+ port)
})