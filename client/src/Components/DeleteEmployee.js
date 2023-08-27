import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { apiLink } from '../apiLink';

export function DeleteEmployee({ name, email, id }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSaveChanges = async () => {
        try {
            await axios.delete(`${apiLink}/delete/employee/${id}`)
            toast.warning("Employee deleted successfully.")
            window.location.reload()

        } catch (err) {
            console.log(err)
        }

        // window.location.reload(false)
        handleClose()
    }
    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the employee named <span className='text-danger'>{name}</span>? Their email address is <span className='text-danger'>{email}</span> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSaveChanges}>
                        Delete Employee
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}