import api from '../api';

/**
 * Передача хода боту
 * @param moves
 */
export function callAIMove(moves) {
    return api.post('/autoBotGenerateMove', {
        moves: moves
    });
}