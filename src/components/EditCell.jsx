import { useContext } from 'react';
import Model from './Model'
import userFunctions from '../utils/userFunctions';
import { UserContext } from '../context/UserContext';
import { FaPen } from "react-icons/fa";
import Swal from 'sweetalert2';

const EditCellRenderer = (props) => {
    const { setModel, dataToEdit, setDataToEdit, setCurrentMode } = useContext(UserContext);
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


