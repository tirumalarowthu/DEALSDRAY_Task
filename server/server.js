const express=require("express")
const dbConnection= require("./db/db")
const authRoute = require("./Routes/authRoute")
const cors =require("cors")
const employeeRoute = require("./Routes/employeeRoute")
const app=express()
const path=require('path')
app.use(express.json())
app.use(cors())

//for authentiacation
app.use("/",authRoute) 
//for create new user
app.use("/",employeeRoute)
 

//Frontend Integration 
const _dirname = path.dirname("")
const builPath = path.join(_dirname, "../client/build");
// app.use(express.static(builPath))
app.use(express.static(path.join(builPath)));
app.get("/*", function (req, res) {
    res.sendFile('index.html',
        { root: path.join(_dirname, "../client/build") },
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    );
})



dbConnection()
const port=8999
app.listen(port,()=>{
    console.log("app listening in port "+ port)
})