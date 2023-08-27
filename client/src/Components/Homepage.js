import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteEmployee } from './DeleteEmployee';
import { apiLink } from '../apiLink';

const Homepage = () => {
  const content = "Employees data is empty. Please add employees.";
  const [pendingStatus, setPendingStatus] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);

  const fetchEmployeeList = async () => {

    try {
      const res = await axios.get(`${apiLink}/allEmployees`);
      setEmployeeList(res.data.employeeList);
      setFilteredEmployeeList(res.data.employeeList);
    } catch (err) {
      console.log(err.message);
    } finally {
      setPendingStatus(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Filter employee list based on searchValue
  const handleOnKeyUp = () => {
    const filteredEmployees = employeeList.filter((employee) => {
      return employee.f_Name.toLowerCase().includes(searchValue.toLowerCase())||employee.f_Designation.toLowerCase().includes(searchValue.toLowerCase())
    }
    );
    setFilteredEmployeeList(filteredEmployees);
  }



  return (
    <div>
      <div className='border border-2 m-2 rounded'>
        <h3 className='text-center'>Welcome Admin pannel</h3>
        <hr />

        <h2>Employee List ({employeeList.length}):</h2><br />
        {
          pendingStatus !== true && <div className="input-group">
            <input placeholder='Search employee by name or designation' value={searchValue} onKeyUp={handleOnKeyUp} onChange={handleSearchChange} className="form-control border-end-0 border border-2 border-dark rounded-pill" type="text" id="example-search-input" />
            <span className="input-group-append">
              <button style={{ marginLeft: "-40px" }} className="btn btn-outline-secondary bg-white border-2 border rounded-pill " type="button">
                <i className="fa fa-search"></i>
              </button>
            </span>

          </div>
        }

        <div className='' style={{overflow:"auto"}}>
          {
            pendingStatus ? <p className='text-center'><span className="spinner-border spinner-border-sm p-2" role="status" aria-hidden="true"></span>  Loading. please wait...</p> : <><table border={1} className='table table-hover'>
              <thead className='bg-light'>
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
                  filteredEmployeeList.length > 0 ? <>
                    {
                      filteredEmployeeList.map((item, index) => {
                        return <tr key={index} id={item._id}>
                          <td>{index + 1}</td>
                          <td>
                            <img style={{ borderRadius: "5px" }} src={item.f_Image} alt="Employee" width={50} height={50} />
                          </td>
                          <td>{item.f_Name}</td>
                          <td>{item.f_Email}</td>
                          <td>{item.f_Mobile}</td>
                          <td>{item.f_Designation}</td>
                          <td>{item.f_Gender}</td>
                          <td>{item.f_Course}</td>
                          <td>{new Date(item.createdAt).toLocaleDateString('en-US', options)}</td>
                          <td className='text-center'>
                            <Link to={`/employee/edit/${item._id}`} > <button style={{ marginRight: "10px" }} className='btn btn-primary'>Edit</button></Link>
                            <DeleteEmployee name={item.f_Name} email={item.f_Email} id={item._id} />
                          </td>
                        </tr>
                      })
                    }
                  </> : null
                }

              </tbody>

            </table>
              <p className='text-center'>{employeeList.length === 0 && content}</p>
              <p className='text-center'>{filteredEmployeeList.length === 0 && "The employee you are looking for is not in our records."}</p>

            </>
          }
        </div>

      </div>
    </div>
  )
}

export default Homepage
