import React, { createContext, useState, useEffect } from 'react';
import userFunctions from '../utils/userFunctions';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    // console.log({ user: users }, "from context");

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
