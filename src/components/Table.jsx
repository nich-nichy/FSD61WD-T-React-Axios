import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { UserContext } from '../context/UserContext';
import userFunctions from '../utils/userFunctions';

const Table = () => {
    const initialColDefs = [];
    const initialRowData = [];
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const { users, setUsers } = useContext(UserContext); console.log({ users }, "from table")
    console.log({ users }, "from table")
    useEffect(() => {
        const fetchedData = async () => {
            const data = await userFunctions.fetchUsers(users);
            setUsers(data);
        }
        fetchedData();
    }, []);

    const processUserKeys = (type) => {
        const subKeyArr = [];
        Object.keys(type)?.forEach((key) => {
            if (typeof type[key] === 'object' && type[key] !== null) {
                // Handle nested objects
                Object.keys(type[key]).forEach((subKey) => {
                    subKeyArr.push(`${key}.${subKey}`);
                });
            } else {
                subKeyArr.push(key);
            }
        });

        return subKeyArr;
    };

    useEffect(() => {
        if (!hasRunOnce && users.length > 0) {
            const userKeys = processUserKeys(users[0]);
            userKeys.forEach((key) => {
                addFieldToColDefs(key);
            });
            setHasRunOnce(true);
        }
    }, [users, hasRunOnce]);

    useEffect(() => {
        let setData = {}
        if (users?.length > 0) {

        }
        setRowData();
    }, []);

    // Rows
    // const [rowData, setRowData] = useState([
    //     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    //     { make: "Ford", model: "F-Series", price: 33850, electric: false },
    //     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    // ]);
    const [rowData, setRowData] = useState(initialRowData);

    // Columns
    const [colDefs, setColDefs] = useState(initialColDefs);

    const addFieldToColDefs = (fieldName) => {
        setColDefs(prev => [...prev, { field: fieldName }]);
    };

    return (
        <div
            className="ag-theme-quartz-dark"
            style={{ height: 500 }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )

}

export default Table

