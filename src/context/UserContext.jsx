import { createContext, useState } from 'react';

export const UserContext = createContext();

// For maintaining global state

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [showModel, setModel] = useState(false);
    const [newOneAdded, isNewOneAdded] = useState(false);
    const [currentMode, setCurrentMode] = useState('add');
    const [dataToEdit, setDataToEdit] = useState(null);
    const [toDelete, setToDelete] = useState(false);
    const [dataToDelete, setDataToDelete] = useState(false);
    return (
        <UserContext.Provider value={{ users, setUsers, showModel, setModel, newOneAdded, isNewOneAdded, currentMode, setCurrentMode, dataToEdit, setDataToEdit, toDelete, setToDelete, dataToDelete, setDataToDelete }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
