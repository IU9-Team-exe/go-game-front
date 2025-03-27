import api from "../api";

/**
 * Логин
 * @param username
 * @param password
 */
export function login(username, password) {
    return api.post("/login", {
        Username: username,
        Password: password,
    })
}