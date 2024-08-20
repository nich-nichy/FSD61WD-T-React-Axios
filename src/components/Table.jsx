import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { UserContext } from '../context/UserContext';
import userFunctions from '../utils/userFunctions';
import EditCellRenderer from './EditCell';
import DeleteCellRenderer from './DeleteCell';
import { FaPen } from "react-icons/fa";


const Table = () => {
    const { users, setUsers } = useContext(UserContext);
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


    useEffect(() => {
        if (!hasRunOnce && users.length > 0) {
            const userKeys = processUserKeys(users[0]);
            userKeys.forEach((key) => {
                addFieldToColDefs(key);
            });
            const flattenedUsers = users.map(user => processUserValues(user));
            console.log("Flattened Users: ", flattenedUsers);
            setRowData(flattenedUsers);
            setHasRunOnce(true);
        }
    }, [users, hasRunOnce]);

    const addFieldToColDefs = (fieldName) => {
        setColDefs(prev => [...prev, { field: fieldName }]);
    };

    const defaultColDef = useMemo(() => {
        return {
            editable: false,
        };
    }, []);

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}

export default Table;
