import api from "../api";

/**
 * Логин
 * @param username
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function login(username, password) {
    return api.post("/login", {
        Username: username,
        Password: password,
    })
}