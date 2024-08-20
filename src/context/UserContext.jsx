import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [showModel, setModel] = useState(false);
    const [newOneAdded, isNewOneAdded] = useState(false);
    const [currentMode, setCurrentMode] = useState('add');
    const [dataToEdit, setDataToEdit] = useState(null);
    return (
        <UserContext.Provider value={{ users, setUsers, showModel, setModel, newOneAdded, isNewOneAdded, currentMode, setCurrentMode, dataToEdit, setDataToEdit }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
