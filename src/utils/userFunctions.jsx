import axios from 'axios';

let providedUrl = 'https://jsonplaceholder.typicode.com/users';
let mockApiUrl = 'https://649f4907245f077f3e9d9245.mockapi.io';

class UserFunctions {
    // For reading the data from the API (READ)
    fetchUsers = async (users) => {
        if (!users || users.length === 0) {
            const readUsers = await axios.get(providedUrl);
            console.log({ fromFetch: readUsers.data });
            return readUsers.data;
        }
        return users;
    };
    // For creating the data from the API (CREATE)
    addUser = async (id) => {
        const addUsers = await axios.post(`${mockApiUrl}/:${id}`, id);
        console.log({ user: addUsers.data })
    };
    // For updating the data from the API (UPDATE)
    updateUser = async (id) => {
        const updateUsers = await axios.put(`${mockApiUrl}/:${id}`, id);
        console.log({ user: updateUsers.data })
    };
    // For deleting the data from the API (DELETE)
    deleteUser = async (id) => {
        const deleteUsers = await axios.delete(`${mockApiUrl}/:${id}`, id);
        console.log({ user: deleteUsers.data })
    };
}

export default new UserFunctions();


