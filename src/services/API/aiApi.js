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

/**
 * Запрос объяснения хода от ИИ для архивной партии
 * @param {string} gameArchiveId - ID архивной партии
 * @param {number} moveSeqNumber - Порядковый номер хода
 */
export function getAIMoveExplanation(gameArchiveId, moveSeqNumber) {
    // Using api instance (axios)
    // return api.post('/getMoveExplanation', {
    //     game_archive_id: gameArchiveId,
    //     move_seq_number: moveSeqNumber
    // });
    // Note: The requirement specified using fetch.
    // If we strictly follow that, the call should be in the component like implemented.
    // If using the existing axios instance `api` is preferred, uncomment the above lines
    // and adjust the component to use this function.
    // For now, this function remains but isn't used directly by the component
    // if the component uses fetch.
     console.warn("getAIMoveExplanation from aiApi.js is defined but might not be used if fetch is used directly in the component.");
     return Promise.reject("This function is not used when fetch is implemented directly in the component.");
}