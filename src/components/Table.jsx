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

const Table = () => {
    const { users, setUsers, setModel, newOneAdded, isNewOneAdded } = useContext(UserContext);
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
            setUsers(data);
        }
        fetchedData();
    }, []);

    const processUserKeys = (user) => {
        const subKeyArr = [];
        const changeObjectStructure = (obj, parentKey = '') => {
            Object.keys(obj).forEach((key) => {
                const fullKey = parentKey ? `${parentKey} ${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    if (key.toLowerCase().includes("geo")) {
                        return;
                    }
                    changeObjectStructure(obj[key], fullKey);
                } else {
                    if (fullKey.toLowerCase() === "company bs") {
                        return;
                    }
                    subKeyArr.push(fullKey);
                }
            });
        };

        changeObjectStructure(user);
        return subKeyArr;
    };


    const processUserValues = (user) => {
        const flattenedUser = {};

        const changeObjectStructure = (obj, parentKey = '') => {
            Object.keys(obj).forEach((key) => {
                const fullKey = parentKey ? `${parentKey} ${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    if (key.toLowerCase().includes("geo")) {
                        return;
                    }
                    changeObjectStructure(obj[key], fullKey);
                } else {
                    if (fullKey.toLowerCase() === "company bs") {
                        return;
                    }
                    flattenedUser[fullKey] = obj[key];
                }
            });
        };

        changeObjectStructure(user);
        return flattenedUser;
    };

    console.log({ newOneAdded, users })

    useEffect(() => {
        console.log("Users in Table: ", users);
        if (!hasRunOnce && users.length > 0) {
            const userKeys = processUserKeys(users[0]);
            userKeys.forEach((key) => {
                addFieldToColDefs(key);
            });
            const flattenedUsers = users.map(user => processUserValues(user));
            console.log("Flattened Users: ", flattenedUsers);
            setRowData(flattenedUsers);
            setHasRunOnce(true);
        } else if (newOneAdded) {
            const flattenedUsers = users.map(user => processUserValues(user));
            console.log("Flattened Users: ", flattenedUsers);
            setRowData(flattenedUsers);
            isNewOneAdded(false);
        }
    }, [users, hasRunOnce, newOneAdded]);

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
            {/* <button type="button" className="btn btn-primary m-2 ms-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add User
            </button> */}
            <Button variant="primary" className="btn btn-primary m-2 ms-0" onClick={() => { setModel(true) }}>
                Add User
            </Button>
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
