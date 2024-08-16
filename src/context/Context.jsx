import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    // For reading the data from the API (READ)
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get('https://jsonplaceholder.typicode.com/users');
            console.log({ user: users.data })
            setUsers(users.data);
        };
        fetchUsers();
    }, []);
    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
