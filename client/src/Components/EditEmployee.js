import React, { useEffect, useState } from 'react'
import EmployeeForm from './EmployeeForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { apiLink } from '../apiLink'
import "./EmployeeFormStyles.css"
const EditEmployee = () => {
    //code for registration of new employee
    const params = useParams()
    const navigate = useNavigate()
    const [empData, setEmpData] = useState({})
    const [loading, setLoading] = useState(false)
    // console.log(params)
    
    useEffect(() => {
        const getEmployeeDetails = async () => {
            await axios.get(`${apiLink}/employee/${params.id}`).then(res => setEmpData(res.data.employeeDetails)).catch(err => {
                console.log(err.message)
            })
        }
        getEmployeeDetails()
    }, [params.id])
    // console.log(empData)

    const handleEditEmployee = async (formdata) => {
        setLoading(true)
        try {
            await axios.patch(`${apiLink}/edit/employee/${params.id}`, formdata).then(res => {
                toast.success(res.data.msg)
                navigate('/')
                setLoading(false)
            }
            )
        } catch (err) {
            toast.warning("Email already exists for another employee.")
            setLoading(false)
            console.log(err)
        }
    }
    return (
        <div>
            <div className=''>
                <div className='employeeForm' style={{ margin: "0px auto ", background: "#efefef" }} >
                    {
                        Object.keys(empData).length > 0 ? <EmployeeForm employeeData={empData} handleSubmit={handleEditEmployee} loading={loading} setLoading={setLoading} /> : <p className='text-center bg-light p-5'><span className="spinner-border spinner-border-sm p-2" role="status" aria-hidden="true"></span>  Loading.Please wait...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditEmployee