import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { UserContext } from '../context/UserContext';
import userFunctions from '../utils/userFunctions';
import EditCellRenderer from './EditCell';
import DeleteCellRenderer from './DeleteCell';
import Button from 'react-bootstrap/Button';
import Model from './Model';

// Table component uses AG GRID - React Grid

const Table = () => {
    const { users, setUsers, setModel, newOneAdded, isNewOneAdded, dataToEdit, setCurrentMode, setDataToEdit, toDelete, setToDelete, dataToDelete, setDataToDelete } = useContext(UserContext);
    const initialColDefs = [
        {
            field: "edit", width: 70, pinned: "right", cellRenderer: EditCellRenderer
        },
        { field: "delete", width: 90, pinned: "right", cellRenderer: DeleteCellRenderer }
    ];
    const initialRowData = [];
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [rowData, setRowData] = useState(initialRowData);
    const [colDefs, setColDefs] = useState(initialColDefs);

    useEffect(() => {
        const fetchedData = async () => {
            const data = await userFunctions.fetchUsers(users);
            setDataToEdit(null);
            setCurrentMode('add');
            setUsers(data);
        }
        fetchedData();
    }, []);

    const camelCaseToSpace = (str) => {
        // Regex from https://stackoverflow.com
        return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    };

    // To get the keys of the user object for setting in aggrid
    const processUserKeys = (user) => {
        const subKeyArr = [];
        const changeObjectStructure = (obj, parentKey = '') => {
            Object.keys(obj).forEach((key) => {
                const formattedKey = camelCaseToSpace(key);
                const fullKey = parentKey ? `${parentKey} ${formattedKey}` : formattedKey;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    if (key.toLowerCase().includes("geo")) {
                        return;
                    }
                    changeObjectStructure(obj[key], fullKey);
                } else {
                    if (fullKey.toLowerCase().includes("zipcode") || fullKey.toLowerCase() === "company bs") {
                        return;
                    }
                    subKeyArr.push(fullKey);
                }
            });
        };
        changeObjectStructure(user);
        return subKeyArr;
    };

    // To get the values of the user object for setting in aggrid
    const processUserValues = (user) => {
        const flattenedUser = {};
        const changeObjectStructure = (obj, parentKey = '') => {
            Object.keys(obj).forEach((key) => {
                const formattedKey = camelCaseToSpace(key);
                const fullKey = parentKey ? `${parentKey} ${formattedKey}` : formattedKey;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    if (key.toLowerCase().includes("geo")) {
                        return;
                    }
                    changeObjectStructure(obj[key], fullKey);
                } else {
                    if (fullKey.toLowerCase().includes("zipcode") || fullKey.toLowerCase() === "company bs") {
                        return;
                    }
                    flattenedUser[fullKey] = obj[key];
                }
            });
        };
        changeObjectStructure(user);
        return flattenedUser;
    };


    useEffect(() => {
        const setData = (flag) => {
            const flattenedUsers = users.map(user => processUserValues(user));
            setRowData(flattenedUsers);
            isNewOneAdded(flag);
        };
        if (!hasRunOnce && users.length > 0) {
            const userKeys = processUserKeys(users[0]);
            userKeys.forEach((key) => {
                addFieldToColDefs(key);
            });
            setData(true);
            setHasRunOnce(true);
        } else if (newOneAdded || (dataToEdit && Object.keys(dataToEdit).length > 0) || toDelete) {
            setData(false);
            if (toDelete) {
                setToDelete(false);
            }
        }
    }, [users, hasRunOnce, newOneAdded, toDelete, dataToEdit]);


    const addFieldToColDefs = (fieldName) => {
        setColDefs(prev => [...prev, { field: fieldName }]);
    };

    const defaultColDef = useMemo(() => {
        return {
            editable: false,
        };
    }, []);

    return (
        <div>
            {/* Button to add new user */}
            <Button variant="primary" className="btn btn-primary m-2 ms-0" onClick={() => {
                setModel(true)
                setCurrentMode('add');
            }}>
                Add User
            </Button>
            {/* Model to add new user */}
            <Model />
            <div className="ag-theme-quartz-dark" style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                />
            </div>
        </div>
    );
}

export default Table;
