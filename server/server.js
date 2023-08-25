const express=require("express")
const dbConnection= require("./db/db")
const app=express()


 





dbConnection()
const port=8999
app.listen(port,()=>{
    console.log("app listening in port "+ port)
})