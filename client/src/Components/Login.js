import React, { useState } from "react";
import axios from "axios";
// import { useNavigation } from "react-router";
const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
//   const navigate = useNavigation()
  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:8999/admin/login/${loginData.username}/${loginData.password}`)
      .then((res) => {
        console.log(res.data);
        // navigate("/dashboard");
      })
      .catch((err) => console.log(err.message));
  };
  //handle input change
  const handleinputChange = async (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return (
    <div className="container">
      <div>
        <form
          style={{
            width: "400px",
            margin: "20px auto",
            padding: "20px",
            border: "2px solid #efefef",
            borderRadius: "10px",
            boxShadow: "0px 0px 2px #efefef",
          }}
          className=""
          onSubmit={handleLogin}
        >
          <h2 className="text-center">Login</h2>
          <hr />
          <div>
            <label style={{ marginBottom: "5px" }}>Username:</label>
            <input
              className="form-control"
              placeholder="admin"
              style={{ marginBottom: "10px" }}
              name="username"
              type="text"
              onChange={handleinputChange}
            />
          </div>
          <div>
            <label style={{ marginBottom: "5px" }}>Password:</label>
            <input
              className="form-control"
              placeholder="admin@123"
              style={{ marginBottom: "10px" }}
              name="password"
              type="text"
              onChange={handleinputChange}
            />
          </div>
          <div>
            <input
              className="form-control btn btn-primary"
              name="name"
              style={{ marginTop: "10px" }}
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
