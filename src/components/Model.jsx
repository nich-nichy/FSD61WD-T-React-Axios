import React from 'react'

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
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder='Enter your name' />
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" />
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="email" />
                                    <label htmlFor="adress street" className="form-label">Address street</label>
                                    <input type="text" className="form-control" id="adress street" />
                                    <label htmlFor="adress suite" className="form-label">Address suite</label>
                                    <input type="text" className="form-control" id="adress suite" />
                                    <label htmlFor="adress city" className="form-label">Address city</label>
                                    <input type="text" className="form-control" id="adress city" />
                                    <label htmlFor="adress geo  lat" className="form-label">Address geo lat</label>
                                    <input type="text" className="form-control" id="adress geo lat" />
                                    <label htmlFor="adress geo lng" className="form-label">Address geo lng</label>
                                    <input type="text" className="form-control" id="adress geo lng" />
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" />
                                    <label htmlFor="website" className="form-label">Website</label>
                                    <input type="text" className="form-control" id="website" />
                                    <label htmlFor="company name" className="form-label">Company name</label>
                                    <input type="text" className="form-control" id="company name" />
                                    <label htmlFor="company catch phrase" className="form-label">Company catch phrase</label>
                                    <input type="text" className="form-control" id="company catch phrase" />
                                    <label htmlFor="company bs" className="form-label">Company bs</label>
                                    <input type="text" className="form-control" id="company bs" />
                                </div>
                            </form>
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
