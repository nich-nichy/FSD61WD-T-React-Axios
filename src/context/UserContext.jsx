import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [showModel, setModel] = useState(false);
    const [newOneAdded, isNewOneAdded] = useState(false);
    return (
        <UserContext.Provider value={{ users, setUsers, showModel, setModel, newOneAdded, isNewOneAdded }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
