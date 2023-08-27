import React, { useState } from 'react'
import EmployeeForm from './EmployeeForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import { apiLink } from '../apiLink'
import "./EmployeeFormStyles.css"
const CreateEmployee = () => {
    const [loading,setLoading]=useState(false)
    //code for registration of new employee

    
    const handleRegisterEmployee = async (formdata) => {
        setLoading(true)
        try {
            const res= await axios.post(`${apiLink}/create/employee`, formdata)
            if(res){
                await toast.success(res.data.msg)
                console.log(res.data)
                setLoading(false)
                window.location.reload()
            }   
        } catch (err) {
            // console.log(err)
            console.log(err.response.data.msg)
            toast.warning(err.response.data.msg)
            setLoading(false)
        }
    }
    return (
        <div>
            <div className=''>
                <div className='employeeForm' style={{ margin: "0px auto ", background: "#efefef" }} >
                    <EmployeeForm handleSubmit={handleRegisterEmployee} loading={loading} setLoading={setLoading} />
                </div>
            </div>
        </div>
    )
}

export default CreateEmployee