import { useContext } from 'react';
import { MdDelete } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import userFunctions from '../utils/userFunctions';
import Swal from 'sweetalert2';

const DeleteCellRenderer = (props) => {
    const { setUsers, setDataToDelete, setToDelete } = useContext(UserContext);
    const { data } = props;
    const handleDelete = async () => {
        console.log(props.data);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteUser = await userFunctions.deleteUser(data.id);
                console.log({ deleteUser });
                if (deleteUser?.status === 200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                    setDataToDelete(data.id);
                    setToDelete(true);
                    setUsers((users) => users.filter(user => user.id !== data.id));
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "There was a problem deleting the file.",
                        icon: "error"
                    });
                }
            }
        });


    };
    return (
        <div>
            <MdDelete onClick={() => handleDelete()} style={{ cursor: 'pointer' }} className="text-danger" />
        </div>
    );
};

export default DeleteCellRenderer;