// src/components/DeleteCellRenderer.jsx
import { useContext } from 'react';
import { MdDelete } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import userFunctions from '../utils/userFunctions';

const DeleteCellRenderer = (props) => {
    const { setUsers, setDataToDelete, setToDelete } = useContext(UserContext);
    const { data } = props;
    const handleDelete = async () => {
        console.log(props.data);
        const deleteUser = await userFunctions.deleteUser(data.id);
        console.log({ deleteUser })
        if (deleteUser?.status === 200) {
            setDataToDelete(data.id)
            setToDelete(true);
            setUsers((users) => users.filter(user => user.id !== data.id));
        }
    };
    return (
        <div>
            <MdDelete onClick={() => handleDelete()} style={{ cursor: 'pointer' }} className="text-danger" />
        </div>
    );
};

export default DeleteCellRenderer;