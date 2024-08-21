import { useContext } from 'react';
import Model from './Model'
import { UserContext } from '../context/UserContext';
import { FaPen } from "react-icons/fa";

// Edit a user

const EditCellRenderer = (props) => {
    const { setModel, setDataToEdit, setCurrentMode } = useContext(UserContext);
    const handleEdit = async () => {
        setCurrentMode('edit');
        const { data } = props;
        setModel(true);
        setDataToEdit(data);
    }
    return (
        <div>
            <FaPen onClick={() => handleEdit()} style={{ cursor: 'pointer' }} className="text-success" />
            <Model />
        </div>
    );
};

export default EditCellRenderer;


