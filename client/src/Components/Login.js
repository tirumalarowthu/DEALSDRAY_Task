import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./LoginStyles.css"
const Login = ({ setIsLogin }) => {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [errormsg, setErrormsg] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    ///code for login
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        validation()
        if (validation() === true) {
            await axios.get(`http://localhost:8999/admin/login/${loginData.username}/${loginData.password}`)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        toast.success(`You have successfully logged in.`)
                        setLoading(false)
                        localStorage.setItem("AdminInfo", JSON.stringify(res.data))
                        setIsLogin(true)
                        navigate("/");
                    }
                    setErrormsg({ user: res.data.msg });
                    navigate("/")
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err.message)
                    setErrormsg({ user: err.response.data.msg })
                    setLoading(false)
                })
        }
        setLoading(false)
    }

    //handle input change
    const handleinputChange = async (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };
    //validations 
    const validation = () => {
        let errors = {}
        if (!loginData.username || loginData.username.trim() === "") {
            errors["username"] = "Username is required."
        } else if ((!/^[a-zA-Z ]+$/.test(loginData.username))) {
            errors["username"] = "Name must contain only alphabets."
        }
        if (!loginData.password || loginData.password.trim() === "") {
            errors["password"] = "Password is required."
        }
        setErrormsg(errors)
        return Object.keys(errors).length === 0
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
                            required
                        />
                        {errormsg.username && <p className="text-danger">{errormsg.username}</p>}
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
                            required
                        />
                        {errormsg.password && <p className="text-danger ">{errormsg.password}</p>}
                    </div>
                    <div>
                        {errormsg.user && <p className="text-danger ">{errormsg.user}</p>}
                        <input
                            className={loading === false ? "form-control btn btn-primary" : "form-control btn btn-warning"}
                            name="name"
                            style={{ marginTop: "10px" }}
                            type="submit"
                            value={loading === false ? "Login" : "Please wait..."}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login

