import React, { useContext } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import userFunctions from '../utils/userFunctions';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../context/UserContext';

const Model = () => {
    const { setUsers, showModel, setModel, isNewOneAdded, dataToEdit, setDataToEdit, setCurrentMode, currentMode } = useContext(UserContext);
    const handleClose = () => {
        setModel(false);
        setDataToEdit(null);
        setCurrentMode('add');
    };
    const checkMode = currentMode?.toLowerCase()?.includes('add');
    return (
        <div>
            <Modal
                show={showModel}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="bg-dark"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{checkMode ? "Add User" : "Edit User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: `${checkMode ? "" : dataToEdit?.name}`,
                            username: `${checkMode ? "" : dataToEdit?.username}`,
                            email: `${checkMode ? "" : dataToEdit?.email}`,
                            addressStreet: `${checkMode ? "" : dataToEdit['address street']}`,
                            addressSuite: `${checkMode ? "" : dataToEdit['address suite']}`,
                            addressCity: `${checkMode ? "" : dataToEdit['address city']}`,
                            phone: `${checkMode ? "" : dataToEdit?.phone}`,
                            website: `${checkMode ? "" : dataToEdit?.website}`,
                            companyName: `${checkMode ? "" : dataToEdit['company name']}`,
                            companyCatchPhrase: `${checkMode ? "" : dataToEdit['company catchPhrase']}`
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .min(2, 'Too Short!')
                                .max(50, 'Too Long!')
                                .required('Required '),
                            username: Yup.string()
                                .min(2, 'Too Short!')
                                .max(50, 'Too Long!')
                                .required('Required '),
                            email: Yup.string().email('Invalid email').required('Required '),
                            addressStreet: Yup.string().required('Required '),
                            addressSuite: Yup.string().required('Required '),
                            addressCity: Yup.string().required('Required '),
                            phone: Yup.string()
                                .required('Required')
                                .test(
                                    'len',
                                    'Enter a valid phone number',
                                    val => val && (val.length >= 5)
                                ),
                            website: Yup.string().required('Required '),
                            companyName: Yup.string().required('Required '),
                            companyCatchPhrase: Yup.string().required('Required '),
                        })}
                        onSubmit={async (values) => {
                            // console.log(values);
                            try {
                                if (checkMode) {
                                    const response = await userFunctions.addUser(values);
                                    const { data } = response;
                                    Swal.fire({
                                        title: 'Form Submitted!',
                                        text: 'User Created Successfully!',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    }).then(() => {
                                        setUsers((oldData) => {
                                            // const newId = oldData.length + 1;
                                            const lastId = oldData.reduce((maxId, user) => Math.max(maxId, user.id), 0);
                                            const newId = lastId + 1;
                                            const newUser = { ...data, id: newId };
                                            return [
                                                ...oldData,
                                                newUser
                                            ];
                                        });
                                        handleClose();
                                        isNewOneAdded(true);
                                    });
                                } else if (currentMode?.toLowerCase()?.includes('edit')) {
                                    const response = await userFunctions.updateUser(dataToEdit.id, values);
                                    const { data } = response;
                                    Swal.fire({
                                        title: 'Form Submitted!',
                                        text: 'User Edited Successfully!',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    }).then(() => {
                                        setUsers((oldData) => {
                                            const newData = oldData.map((user) => {
                                                if (user.id === dataToEdit.id) {
                                                    return { ...user, ...data };
                                                }
                                                return user;
                                            });
                                            return newData;
                                        });
                                        handleClose();
                                        isNewOneAdded(true);
                                    });
                                }
                            } catch (error) {
                                Swal.fire({
                                    title: 'Form Submission Failed!',
                                    text: `Oops! Something went wrong.`,
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                }).then(() => {
                                    handleClose();
                                    isNewOneAdded(false);
                                });;
                            }
                        }}
                    >
                        {({ values, setFieldValue, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label m-1">Name</label>
                                    <Field id="name" name="name" placeholder="Enter name" className="form-control" />
                                    <ErrorMessage name="name" component="div" className="text-danger p-1" />
                                    <label htmlFor="username" className="form-label m-1">Username</label>
                                    <Field className="form-control" id="username" name="username" placeholder='Enter username' />
                                    <ErrorMessage name="username" component="div" className="text-danger p-1" />
                                    <label htmlFor="email" className="form-label m-1">Email</label>
                                    <Field type="email" className="form-control" name="email" id="email" placeholder='Enter email' />
                                    <ErrorMessage name="email" component="div" className="text-danger p-1" />
                                    <label htmlFor="addressStreet" className="form-label m-1">Address street</label>
                                    <Field type="text" className="form-control" id="addressStreet" name="addressStreet" placeholder='Enter address street' />
                                    <ErrorMessage name="addressStreet" component="div" className="text-danger p-1" />
                                    <label htmlFor="addressSuite" className="form-label m-1">Address suite</label>
                                    <Field type="text" className="form-control" id="addressSuite" name="addressSuite" placeholder='Enter address suite' />
                                    <ErrorMessage name="addressSuite" component="div" className="text-danger p-1" />
                                    <label htmlFor="addressCity" className="form-label m-1">Address city</label>
                                    <Field type="text" className="form-control" id="addressCity" name="addressCity" placeholder='Enter address city' />
                                    <ErrorMessage name="addressCity" component="div" className="text-danger p-1" />
                                    <label htmlFor="phone" className="form-label m-1">Phone</label>
                                    <PhoneInput
                                        className="number"
                                        country={"in"}
                                        value={values.phone}
                                        onChange={(phone) => setFieldValue("phone", phone)}
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-danger p-1" />
                                    <label htmlFor="website" className="form-label m-1">Website</label>
                                    <Field type="text" className="form-control" name="website" id="website" placeholder='Enter website' />
                                    <ErrorMessage name="website" component="div" className="text-danger p-1" />
                                    <label htmlFor="companyName" className="form-label m-1">Company name</label>
                                    <Field type="text" className="form-control" name="companyName" id="companyName" placeholder='Enter company name' />
                                    <ErrorMessage name="companyName" component="div" className="text-danger p-1" />
                                    <label htmlFor="companyCatchPhrase" className="form-label m-1">Company catch phrase</label>
                                    <Field type="text" className="form-control" name="companyCatchPhrase" id="companyCatchPhrase" placeholder='Enter company catch phrase' />
                                    <ErrorMessage name="companyCatchPhrase" component="div" className="text-danger p-1" />
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    {checkMode ? <Button variant="primary" type='submit'>
                                        Save
                                    </Button> : <Button variant="primary" type='submit'>
                                        Edit
                                    </Button>}

                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Model;
