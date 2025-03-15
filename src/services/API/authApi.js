import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginRequest = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    });
    return response.data;
};

export const registerRequest = async (email, nickname, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        nickname,
        password,
    });
    return response.data;
};
