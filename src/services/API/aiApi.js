import api from '../api';

/**
 * Передача хода боту KataGo (если используется)
 * @param moves - массив ходов [{ color: 'b', coordinates: 'Q16' }, ...]
 */
export function callAIMove(moves) {
    return api.post('/autoBotGenerateMove', {
        moves: moves
    });
}

/**
 * Получение объяснения хода от ИИ (LLM)
 * @param {string} gameArchiveId - ID игры из архива (например, "67f2808fdc03c6146ecf7a82")
 * @param {number} moveSeqNumber - Порядковый номер хода (например, 16)
 */
export function getMoveExplanation(gameArchiveId, moveSeqNumber) {
    // Validate input slightly
    if (!gameArchiveId || typeof moveSeqNumber !== 'number' || moveSeqNumber <= 0) {
        return Promise.reject(new Error("Invalid parameters for getMoveExplanation"));
    }
    return api.post('/getMoveExplanation', {
        game_archive_id: gameArchiveId,
        move_seq_number: moveSeqNumber
    });
}