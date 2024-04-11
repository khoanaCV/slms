import axios from "axios";


const { REACT_APP_URL_SERVER } = process.env;
const url = REACT_APP_URL_SERVER;

const getProfileById = (id) => {
    return axios
        .get(url + "/api/User/GetProfileById?id=" + id,)
        .then((response) => {
            return response.data;
        });
}

const updateProfile = (id, formData) => {
    return axios
        .put(url + "/api/User/updateprofile/" + id,
            formData
        )
        .then((response) => {
            return response.data;
        });
}

const resetpassword = (currentId, currentPassword, newPassword, confirmPassword) => {
    return axios
        .post(url + "/api/User/changepassword?id=" + currentId, {
            currentPassword, newPassword, confirmPassword
        })
        .then((response) => {
            return response.data;
        });
}

export { updateProfile, resetpassword, getProfileById }