import React from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Model = () => {
    return (
        <div>
            <div className="modal fade bg-dark" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={{
                                    name: '',
                                    username: '',
                                    email: '',
                                    addressStreet: '',
                                    addressSuite: '',
                                    addressCity: '',
                                    phone: '',
                                    website: '',
                                    companyName: '',
                                    companyCatchPhrase: '',
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
                                    alert(JSON.stringify(values, null, 2));
                                }}
                            >
                                {({ values, setFieldValue, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label m-1">Name</label>
                                            <Field id="name" name="name" placeholder="Enter name:" className="form-control" />
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
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Model;
