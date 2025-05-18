import api from "../api";

/**
 * Получение задач для пользователя по уровню с пагинацией.
 *
 * @param {number} page - Номер страницы.
 * @param {string} userID - Идентификатор пользователя.
 * @param {number|string} level - Уровень задачи.
 */
export function getAvailableGamesForUser(page, userID, level) {
    return api.get(`/getAvailableGamesForUser?page=${page}&userID=${userID}&level=${level}`);
}

/**
 * Отметка задачи выполненной
 *
 * @param {number} taskID - идентификатор задачи.
 */
export function markTaskAsDone(taskID) {
    return api.get(`/markTaskAsDone?taskID=${taskID}`);
}

