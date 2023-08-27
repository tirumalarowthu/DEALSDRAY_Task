import React, { useState } from 'react'
import EmpForm from './EmpForm'
import axios from 'axios'
import { toast } from 'react-toastify'

const NewEmployeeForm = () => {
    const [loading,setLoading]=useState(false)
    //code for registration of new employee

    
    const handleRegisterEmployee = async (formdata) => {
        setLoading(true)
        try {
            const res= await axios.post("http://localhost:8999/create/employee", formdata)
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
                <div className='w-50 ' style={{ margin: "0px auto ", background: "#efefef" }} >
                    <EmpForm handleSubmit={handleRegisterEmployee} loading={loading} setLoading={setLoading} />
                </div>
            </div>
        </div>
    )
}

export default NewEmployeeForm