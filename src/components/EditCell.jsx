import { useContext } from 'react';
import Model from './Model'
import { UserContext } from '../context/UserContext';
import { FaPen } from "react-icons/fa";

const EditCellRenderer = (props) => {
    const { setModel, setDataToEdit } = useContext(UserContext);
    const handleEdit = () => {
        const { data } = props;
        setModel(true);
        setDataToEdit(data);
    }
    return (
        <div>
            <FaPen onClick={() => handleEdit()} style={{ cursor: 'pointer' }} className="text-success" />
            <Model mode={"edit"} />
        </div>
    );
};

export default EditCellRenderer;


