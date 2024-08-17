import React from 'react';
import { FaPen } from "react-icons/fa";

const EditCellRenderer = (props) => {
    return (
        <div>
            <FaPen onClick={() => alert('Edit clicked!')} style={{ cursor: 'pointer' }} className="text-success" />
        </div>
    );
};

export default EditCellRenderer;


