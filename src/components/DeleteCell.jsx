// src/components/DeleteCellRenderer.jsx
import React from 'react';
import { MdDelete } from "react-icons/md";

const DeleteCellRenderer = (props) => {
    return (
        <div>
            <MdDelete onClick={() => console.log(props.data)} style={{ cursor: 'pointer' }} className="text-danger" />
        </div>
    );
};

export default DeleteCellRenderer;