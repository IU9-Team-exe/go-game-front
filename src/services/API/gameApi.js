import api from "../api";

/**
 * Создание новой игры
 * @param nickname
 */
export function newGame(nickname) {
    return api.post("/NewGame", {
        users: [
            {
                id: nickname,
                color: "black",
                role: "creator",
            },
        ],
        board_size: 19,
        status: "waiting",
        player_black: nickname,
    });
}

/**
 * Присоединение к новой игре по коду
 * @param gameCode
 * @param nickname
 */
export function joinGame(gameCode, nickname) {
    return api.post("/JoinGame", {
        game_key: gameCode,
        user_id: nickname,
        role: "player",
    });
}

/**
 * Получение информации об игре
 * @param gameCode
 */
export function getGameInfo(gameCode, ) {
    return api.post("/getGameInfo", {
        game_key: gameCode,
    });
}

