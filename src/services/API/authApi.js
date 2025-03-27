import api from "../api";

const authAPI = {
    login: (username, password) =>
        api.post("/login", {
            Username: username,
            Password: password,
        }),
};

export default authAPI;
