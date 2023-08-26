import React, { useEffect, useState } from 'react'
import EmpForm from './EmpForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    //code for registration of new employee
    const params = useParams()
    const navigate=useNavigate()
    const [empData, setEmpData] = useState({})
    // console.log(params)
    const getEmployeeDetails = async () => {
        await axios.get(`http://localhost:8999/employee/${params.id}`).then(res => setEmpData(res.data.employeeDetails)).catch(err => {
            console.log(err.message)
        })
    }
    useEffect(() => {
        getEmployeeDetails()
    }, [])
    // console.log(empData)

    const handleEditEmployee = async (formdata) => {
        console.log("handle Edit form")
        console.log(formdata)
        console.log(params.id)
        try {
            await axios.patch(`http://localhost:8999/edit/employee/${params.id}`, formdata).then(res => {
              toast.success(res.data.msg)
                // console.log(res.data)
                // window.location.reload()
                navigate('/')
            }
            ).catch(err =>toast.warning("Email already exists for another employee."))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className=''>
                <div className='w-50 ' style={{ margin: "0px auto ", background: "#efefef" }} >
                    {
                        Object.keys(empData).length > 0 ? <EmpForm employeeData={empData} handleSubmit={handleEditEmployee} /> : <p className='text-center bg-light p-5'>Please wait...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditEmployee