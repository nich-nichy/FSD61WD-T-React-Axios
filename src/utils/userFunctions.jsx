import axios from 'axios';

let providedUrl = 'https://jsonplaceholder.typicode.com/users';

class UserFunctions {
    // For reading the data from the API (READ)
    fetchUsers = async (users) => {
        try {
            if (!users || users.length === 0) {
                const readUsers = await axios.get(providedUrl);
                // console.log({ fromFetch: readUsers.data });
                return readUsers.data;
            }
            return users;
        } catch (error) {
            return error;
        }
    };
    // For creating the data from the API (CREATE)
    addUser = async (values) => {
        try {
            const addUsers = await axios.post(`${providedUrl}`, values);
            return addUsers;
        } catch (error) {
            return error;
        }
    };
    // For updating the data from the API (UPDATE)
    updateUser = async (id, toUpdate) => {
        try {
            const updateUsers = await axios.put(`${providedUrl}/${id}`, toUpdate);
            return updateUsers;
        } catch (error) {
            return error;
        }
    };
    // For deleting the data from the API (DELETE)
    deleteUser = async (id) => {
        try {
            const deleteUsers = await axios.delete(`${providedUrl}/${id}`, id);
            console.log({ user: deleteUsers.data })
        } catch (error) {
            return error;
        }
    };
}

export default new UserFunctions();


