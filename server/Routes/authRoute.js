const express = require("express");
const Admin = require("../models/login");
const authRoute = express.Router();
authRoute.post("/admin/register", async function (req, res) {
  const { username, password } = req.body;
  const isExits = await Admin.findOne({ username });
  if (isExits) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const data = await Admin.create({ username, password });
    res.status(201).json(data);
  }
});
authRoute.get("/admin/login/:username/:password", async function (req, res) {
    // console.log(req.params.username, req.params.password);
    const {username,password}=req.params
  const isExits = await Admin.findOne({ username});
  if (isExits) {
    if (isExits.password === password) {
      res.status(200).json(isExits);
    } else {
        res.json({msg:"password is incorrect."})      
    }
  } else {
    res.status(404).json({ msg: "User not found" });
  }
});
module.exports = authRoute;
