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