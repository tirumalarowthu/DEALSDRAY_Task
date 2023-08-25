import React, { useState } from "react";

const Login = () => {
    const [loginData,setLoginData] =useState({name:"",password:""})
    const handleLogin =async(e)=>{
        e.preventDefault();

    }
  return (
    <div className="container">
      <div>
        <form
          style={{
            width: "400px",
            margin: "20px auto",
            padding: "20px",
            border: "2px solid #efefef",
            borderRadius:"10px",
            boxShadow:"0px 0px 2px #efefef",
          }}
          className=""
        >
          <h2 className="text-center">Login</h2>
          <hr/>
          <div>
            <label style={{marginBottom:"5px"}}>Username:</label>
            <input className="form-control" placeholder="admin" style={{marginBottom:"10px"}} name="name" type="text" />
          </div>
          <div>
            <label style={{marginBottom:"5px"}}>Password:</label>
            <input className="form-control" placeholder="admin@123" style={{marginBottom:"10px"}} name="name" type="text" />
          </div>
          <div>
            <input className="form-control btn btn-primary" name="name" style={{marginTop:"10px"}} type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
