import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { UserContext } from '../context/UserContext';
import userFunctions from '../utils/userFunctions';

const Table = () => {
    const { users, setUsers } = useContext(UserContext); console.log({ users }, "from table")

    useEffect(() => {
        const fetchedData = async () => {
            const data = await userFunctions.fetchUsers(users);
            setUsers(data);
        }
        fetchedData();
    }, []);

    // Rows
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Columns
    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);

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

