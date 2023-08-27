import { Navbar, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import "./HeaderStyles.css"
const Header = () => {
    const navigate = useNavigate()
    const logout = async() => {
        localStorage.removeItem("AdminInfo")
        await toast.warning("Account logout Successfully")
        navigate("/")
        window.location.reload(false)
    }
    return (
        <Navbar style={{fontWeight:"600",padding:"10px"}} bg="info" variant="dark" expand="lg">
            <Navbar.Brand className='navLink' href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Link className='navLink' to="/create/employee">Create New Employee</Link>
                </Nav>
                <Nav className="mr-3">
                    Hi {localStorage.getItem("AdminInfo")&& JSON.parse(localStorage.getItem("AdminInfo")).username}  
                </Nav>
                <Nav>
                    <Link className='navLink' onClick={logout} >Logout</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;

// import React from 'react'
// import "./HeaderStyles.css"
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// const Header = () => {
    // const navigate=useNavigate()
    // const logout = () => {
    //     localStorage.removeItem("AdminInfo")
    //     toast.warning("Account Logout Successfully")
    //     navigate("/")
    //     window.location.reload(false)
    // }
    
   
//     return (
//         <div id="header" className='header'>
//             <ul className='header_ul'>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/addApplicant">Add Applicant</Link></li>
//                 <li><Link to="/update/one">Update Applicant Status</Link></li>
//                 <li onClick={() => logout()}>Logout</li>
//             </ul>
//         </div>
//     )
// }


// export default Header