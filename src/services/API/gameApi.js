import api from "../api";

/**
 * Создание новой игры
 */
export function newGame() {
    return api.post("/NewGame", {
        "board_size": 19,
        "is_creator_black": true,
        "komi": 3.5,
    });
}

/**
 * Присоединение к новой игре по коду
 * @param gameCode
 */
export function joinGame(gameCode) {
    return api.post("/JoinGame", {
        public_key: gameCode,
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

