import api from '../api';

/**
 * Создание новой игры с ботом
 * @returns {Promise}
 */
export function newBotGame() {
    return api.post('/newBotGame', {
        board_size: 19,
        Komi: 3.5,
        rules: 'chinese',
        is_creator_black: true
    });
}

/**
 * Генерация хода от бота
 * @param {{ color: string, coordinates: string }} move
 * @returns {Promise}
 */
export function generateMove(move) {
    return api.post('/generateMove', {
        move: move,
    });
}
