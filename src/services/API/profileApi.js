import api from "../api";

/**
 * Получение информации о пользователе по id
 * @param id
 */
export function getUserById(id) {
    return api.post("/getUserById", {
        user_id: id,
    })
}

/**
 * Получение информации о пользователе
 * @param username
 */
export function getUserByNickname(username) {
    return api.post("/getUserByUsername", {
        username: username,
    })
}

/**
 * Обновление информации о пользователе
 * @param username
 * @param email
 */
export function updateUserData(username, email) {
    return api.post("/updateUserData", {
        username: username,
        email: email,
    })
}