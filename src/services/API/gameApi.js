import api from "../api";

/**
 * Создание новой игры
 * @param {Object} options - Параметры игры (размер доски, режим, противник и т.д.)
 * @returns {Promise} - Результат запроса
 */
export function newGame(options) {
    return api.post("/NewGame", options);
}

/**
 * Присоединение к игре
 * @param {Object} options - Параметры игры (ключ)
 * @returns {Promise} - Результат запроса
 */
export function joinGame(options) {
    return api.post("/JoinGame", options);
}

/**
 * Получение данных об игре по ID
 * @param {string|number} gameId - Идентификатор игры
 * @returns {Promise} - Результат запроса
 */
export function getGameById(gameId) {
    return api.get(`/games/${gameId}`);
}

/**
 * Сделать ход в игре
 * @param {string|number} gameId - Идентификатор игры
 * @param {Object} move - Информация о ходе (например, координаты x,y)
 * @returns {Promise} - Результат запроса
 */
export function makeMove(gameId, move) {
    // Например, move = { x: 3, y: 10, color: "black" }
    return api.post(`/games/${gameId}/moves`, move);
}

/**
 * Сдаться в текущей игре
 * @param {string|number} gameId - Идентификатор игры
 * @returns {Promise} - Результат запроса
 */
export function resignGame(gameId) {
    return api.post(`/games/${gameId}/resign`);
}

/**
 * Завершить игру (например, если дошли до конца или посчитали очки)
 * @param {string|number} gameId - Идентификатор игры
 * @returns {Promise} - Результат запроса
 */
export function endGame(gameId) {
    return api.post(`/games/${gameId}/end`);
}

/**
 * Получить список доступных игр (например, публичных или ожидающих игроков)
 * @returns {Promise} - Результат запроса
 */
export function getAvailableGames() {
    return api.get("/games");
}
