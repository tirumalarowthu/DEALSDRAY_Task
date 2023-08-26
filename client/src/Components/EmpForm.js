import React, { useState } from 'react';

const EmpForm = ({ handleSubmit, employeeData }) => {
    const [formdata, setFormdata] = useState(employeeData ? employeeData : {
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_Gender: "",
        f_Course: "",
        f_Image: ""
    });
    // console.log(formdata)

    const handleChangeFormdata = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });

    };
    const handleFormSumbit = (e) => {
        e.preventDefault()

        handleSubmit(formdata)
    }

    return (
        <div>
            <form onSubmit={handleFormSumbit} style={{ marginTop: "10px", borderRadius: "5px", padding: "20px" }} className='border border-2'>
                <h4 className='text-center'>{employeeData ? "Edit Employee Details":"Create New Employee" }</h4><hr />
                <div className='mb-2'>
                    <label className='font-weight-bold' htmlFor='Name' >Name:</label>
                    <input className='form-control' type="text" name="f_Name" minLength={3} value={formdata.f_Name} onChange={handleChangeFormdata} required />
                </div>
                <div className='mb-2'>
                    <label className='font-weight-bold' >Email:</label>
                    <input className='form-control' type="email" name="f_Email" value={formdata.f_Email} onChange={handleChangeFormdata} required />
                </div>
                <div className='mb-2'>
                    <label className='font-weight-bold' >Mobile No:</label>
                    <input className='form-control' type="number" name="f_Mobile" value={formdata.f_Mobile} onChange={handleChangeFormdata} required />
                </div>

                <div className='mb-2'>
                    <label className='font-weight-bold' >Designation:</label>
                    <select className='form-select' name="f_Designation" defaultValue={formdata.f_Designation} onChange={handleChangeFormdata} required >
                        <option value="" >---Select Designation---</option>
                        <option value="HR" >HR</option>
                        <option value="Sales" >Sales</option>
                        <option value="Manager" >Manager</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label className='font-weight-bold' >Gender:</label>
                    <br />
                    <input className='' type="radio" id="Male" name="f_Gender" value="Male" onChange={handleChangeFormdata} checked={formdata.f_Gender === "Male"} required />
                    <label className='p-2' htmlFor='Male'>Male</label>
                    <input className='' type="radio" id="Female" name="f_Gender" value="Female" onChange={handleChangeFormdata} checked={formdata.f_Gender === "Female"} required />
                    <label className='p-2' htmlFor='Female'>Female</label>
                </div>
                <div className='mb-2'>
                    <label className='font-weight-bold' >Course:</label>
                    <select className='form-select' name="f_Course" defaultValue={formdata.f_Course} onChange={handleChangeFormdata} required >
                        <option value="">---Select Course---</option>
                        <option value="MCA">MCA</option>
                        <option value="BCA" >BCA</option>
                        <option value="BSC">BSC</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label className='font-weight-bold' >Upload Image:</label>
                    {
                        employeeData && <p>Image : {formdata.f_Image}</p>
                    }
                    <input type="file" className='form-control' name="f_Image" accept='.jpg,.jpeg,.png' onChange={handleChangeFormdata} required={formdata.f_Image == ""} />
                </div>
                <div className='mt-2'>
                    <input className='form-control btn btn-primary' type="submit" value={employeeData ? "Update details":" Add Employee"} />
                </div>
            </form>
        </div>
    );
};

export default EmpForm;




// if (e.target.type === "checkbox") {
//     const selectedCourses = [...formdata.f_Course];

//     if (checked) {
//         selectedCourses.push(value);
//     } else {
//         const index = selectedCourses.indexOf(value);
//         if (index !== -1) {
//             selectedCourses.splice(index, 1);
//         }
//     }
//     setFormdata({ ...formdata, [name]: selectedCourses });
// } else {