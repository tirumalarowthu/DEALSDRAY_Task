import React from 'react'
import EmpForm from './EmpForm'
import axios from 'axios'
import { toast } from 'react-toastify'

const NewEmployeeForm = () => {
    //code for registration of new employee
    const handleRegisterEmployee = async (formdata) => {
        console.log("handle registrations form")
        console.log(formdata)
        try {
            await axios.post("http://localhost:8999/create/employee", formdata).then(res => {
                toast.success(res.data.msg)
                console.log(res.data)
                window.location.reload()
            }
            ).catch(err => console.log(err))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className=''>
                <div className='w-50 ' style={{ margin: "0px auto ", background: "#efefef" }} >
                    <EmpForm handleSubmit={handleRegisterEmployee} />
                </div>
            </div>
        </div>
    )
}

export default NewEmployeeForm