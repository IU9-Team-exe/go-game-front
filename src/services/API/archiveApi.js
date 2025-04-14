import api from "../api";

/**
 * Массив имен из архива
 * @param page
 */
export function getNamesInArchive(page) {
    return api.get(`/getNamesInArchive?page=${page}`)
}

/**
 * Массив лет из архива
 */
export function getYearsInArchive() {
    return api.get(`/getYearsInArchive`)
}

/**
 * Возвращает архив игр с постраничной разбивкой,
 * с возможностью фильтрации по году или имени игрока.
 * Обязательно необходимо указать хотя бы один из параметров: год (year) или имя (name).
 * @param year
 * @param name
 * @param page
 */
export function getArchive(year, name, page) {
    return api.get(`/getArchive?year=${year}&name=${name}&page=${page}`)
}


/**
 * Получение информации об игре из архива
 * @param {string} gameId – идентификатор игры
 */
export function getGameFromArchiveById(gameId) {
    return api.post(`/getGameFromArchiveById`, {game_id: gameId});
}
