import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    // console.log({ user: users }, "from context");
    const [showModel, setModel] = useState(false);
    return (
        <UserContext.Provider value={{ users, setUsers, showModel, setModel }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
