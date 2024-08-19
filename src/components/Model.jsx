import React from 'react'
import { Formik, Field, Form } from 'formik';

const Model = () => {

    return (
        <div>
            <div className="modal fade bg-dark" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    name: '',
                                    username: '',
                                    email: '',
                                    addressStreet: '',
                                    addressSuite: '',
                                    addressCity: '',
                                    addressGeoLat: '',
                                    addressGeoLng: '',
                                    phone: '',
                                    website: '',
                                    companyName: '',
                                    companyCatchPhrase: '',
                                    companyBs: ''
                                }}
                                onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    alert(JSON.stringify(values, null, 2));
                                }}
                            >
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <Field id="name" name="name" placeholder="Enter name:" className="form-control" />
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <Field className="form-control" id="username" name="username" placeholder='Enter username' />
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <Field type="email" className="form-control" name="email" id="email" placeholder='Enter email' />
                                        <label htmlFor="address street" className="form-label">Address street</label>
                                        <Field type="text" className="form-control" id="addressStreet" name="addressStreet" placeholder='Enter address street' />
                                        <label htmlFor="address suite" className="form-label">Address suite</label>
                                        <Field type="text" className="form-control" id="addressSuite" name="addressSuite" placeholder='Enter address suite' />
                                        <label htmlFor="address city" className="form-label">Address city</label>
                                        <Field type="text" className="form-control" id="addressCity" name="addressCity" placeholder='Enter address city' />
                                        <hr />
                                        <span className='text-danger fs-7'>Note: If you dont know your lat and lng get it </span>
                                        <a className='text-decoration-underline' style={{ cursor: 'pointer' }} onClick={() => window.open("https://www.latlong.net/")}>from here.</a>
                                        <br />
                                        <label htmlFor="addressGeoLat" className="form-label">Address geo lat</label>
                                        <Field type="text" className="form-control" name="addressGeoLat" id="adressGeoLat" placeholder='Enter address geo lat' />
                                        <label htmlFor="adressGeoLng" className="form-label">Address geo lng</label>
                                        <Field type="text" className="form-control" name="addressGeoLat" id="adressGeoLng" placeholder='Enter address geo lng' />
                                        <hr />
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <Field type="tel" className="form-control" name="phone" id="phone" placeholder='Enter phone' />
                                        <label htmlFor="website" className="form-label">Website</label>
                                        <Field type="text" className="form-control" name="website" id="website" placeholder='Enter website' />
                                        <label htmlFor="companyName" className="form-label">Company name</label>
                                        <Field type="text" className="form-control" name="companyName" id="companyName" placeholder='Enter company name' />
                                        <label htmlFor="companyCatchPhrase" className="form-label">Company catch phrase</label>
                                        <Field type="text" className="form-control" name="companyCatchPhrase" id="companyCatchPhrase" placeholder='Enter company catch phrase' />
                                        <label htmlFor="companyBs" className="form-label">Company bs</label>
                                        <Field className="form-control" name="companyBs" id="companyBs" placeholder='Enter company bs' />
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model
