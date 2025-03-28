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

/**
 * Выход из аккаунта
 */
export function logout() {
    return api.delete("/logout");
}

/**
 * Регистрация
 * @param username
 * @param password
 * @param email
 */
export function register(username, password, email) {
    return api.post("/register", {
        Username: username,
        Password: password,
        Email: email,
    })
}