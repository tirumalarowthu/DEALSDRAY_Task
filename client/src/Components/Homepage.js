import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteModel } from './DeleteModel'

const Homepage = () => {
  const content = "Still data is pending"
  const [pendingStatus, setPendingStatus] = useState(true)
  const [pendingApprovals, setPendingApprovals] = useState([{ name: "veera", email: "veera@gmail.com" }])
  const [employeeList, setEmployeeList] = useState([{
    f_Name: "Veera",
    f_Email: "Veera@gmail.com",
    f_Mobile: "988888888",
    f_Designation: "HR",
    f_Gender: "Male",
    f_Course: "MCA",
    f_Image: "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg"
  }])
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const fetchEmployeeList = async () => {
    try {
      await axios.get("http://localhost:8999/allEmployees").then(res=>setEmployeeList(res.data.employeeList))
    }
    catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    fetchEmployeeList()
    setPendingStatus(false)

  }, [])
  const handleUpdate = () => {

  }
  const handleDelete = () => {

  }
  return (
    <div>
        <div className='border border-2 m-2 rounded'>
          <h3 className='text-center'>Welcome Admin pannel</h3>
          <hr />
          <div className=''>
            {
              pendingStatus ? <p className='text-center'>Loading please wait...</p> : <><table style={{overflowY:"auto",width:"100%"}} border={1} className='table table-hover'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Designation</th>
                    <th>Gender</th>
                    <th>Course</th>
                    <th>Create date</th>
                    <th className='text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employeeList.length > 0 ? <>
                      {
                        employeeList.map((item, index) => {
                          return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img src={item.f_Image} alt="Image" width={40} />
                            </td>
                            <td>{item.f_Name}</td>
                            <td>{item.f_Email}</td>
                            <td>{item.f_Mobile}</td>
                            <td>{item.f_Designation}</td>
                            <td>{item.f_Gender}</td>
                            <td>{item.f_Course}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString('en-US', options)}</td>
                            <td className='text-center'>
                             <Link to={`/employee/edit/${item._id}`} > <button style={{ marginRight: "10px" }} onClick={() => handleUpdate(item._id, true, item.name)} className='btn btn-primary'>Edit</button></Link>
                              <DeleteModel name={item.f_Name} email={item.f_Email} id={item._id}/>
                            </td>
                          </tr>
                        })
                      }
                    </> : null
                  }

                </tbody>

              </table>
                <p>{pendingApprovals.length === 0 && content}</p>
              </>
            }

          </div>

        </div>
    </div>
  )
}

export default Homepage

