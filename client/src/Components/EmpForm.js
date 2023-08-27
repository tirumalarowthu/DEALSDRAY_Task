import React, { useState } from 'react';

const EmpForm = ({ handleSubmit, employeeData, loading, setLoading }) => {
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
    console.log(loading)
    //loading buttons
    const handleChangeFormdata = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
    };
    const handleFormSumbit = (e) => {
        e.preventDefault()
        handleSubmit(formdata)
    }

    //adding picture
    const [pic, setPic] = useState();
    console.log(pic, "pic not selected")
    const [picLoading, setPicLoading] = useState(false);
    const postDetails = (pic) => {
        setPicLoading(true);
        if (pic === undefined) {
            alert("Please select an image")
            return;
        }
        console.log(pic);
        if (pic) {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "frontend");
            data.append("cloud_name", "du51yn1qe");
            fetch("https://api.cloudinary.com/v1_1/du51yn1qe/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    const picUrl = "f_Image"
                    setPic(data.url.toString());
                    setFormdata({ ...formdata, [picUrl]: data.url.toString() });
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            alert("Please select an image")
            setPicLoading(false);
            return;
        }
    };
    return (
        <div>
            <form onSubmit={handleFormSumbit} style={{ marginTop: "10px", borderRadius: "5px", padding: "20px" }} className='border border-2'>
                <h4 className='text-center'>{employeeData ? "Edit Employee Details" : "Create New Employee"}</h4><hr />
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
                    <input className='form-control' type="number" min="6000000000" max="9999999999" name="f_Mobile" value={formdata.f_Mobile} onChange={handleChangeFormdata} required />
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
                        employeeData && <div className='text-center bg-white '>I
                            <img style={{ border: "2px solid", borderRadius: "10px", padding: "10px", margin: "10px auto" }} width={150} height={150} className='border border-rounded' src={formdata.f_Image} alt="Employee" />
                        </div>
                    }
                    {
                        employeeData && <p className='fw-bold'>For upload new image :</p>
                    }
                    <input type="file" className='form-control mt-2' name="f_Image" accept='.jpg,.jpeg,.png' onChange={(e) => postDetails(e.target.files[0])} required={formdata.f_Image === ""} />
                </div>

                <div className='mt-2'>
                    {/* {
                        picLoading ? <input type="submit" className='form-control btn btn-warning' disabled value="Please wait image uploading..." /> : loadingbtns
                    } */}
                    {picLoading ? (
                        <input
                            type="submit"
                            className='form-control btn btn-warning'
                            disabled
                            value="Please wait image uploading..."
                        />
                    ) : loading ? (
                        <button className='btn btn-warning form-control p-2' disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span>{employeeData ? "Updating employee details..." : "Creating new employee..."}</span>

                        </button>
                    ) : (
                        <button className='btn btn-primary form-control p-2'>
                            {employeeData ? "Update employee details" : "Create new employee"}
                        </button>
                    )}
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