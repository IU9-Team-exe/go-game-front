import React, {createContext, useContext, useReducer, useEffect, useMemo} from "react";

const SET_GAME_INFO = "SET_GAME_INFO";
const SET_GAME_KEY = "SET_GAME_KEY";
const SET_SGF = "SET_SGF";
const SET_PLAYER_COLOR = "SET_PLAYER_COLOR";
const SET_GAME_KEY_BOT = "SET_GAME_KEY";
const SET_SGF_BOT = "SET_SGF";

const getInitialState = () => ({
    gameInfo: null,
    gameKey: localStorage.getItem("game_key"),
    sgf: localStorage.getItem("game_sgf") || '(;FF[4]GM[1]SZ[19])',
    playerColor: localStorage.getItem("player_color"),
    gameKeyBot: localStorage.getItem("game_key_bot"),
    sgfBot: localStorage.getItem("game_sgf_bot") || '(;FF[4]GM[1]SZ[19])',
});

function gameReducer(state, action) {
    switch (action.type) {
        case SET_GAME_INFO:
            return {...state, gameInfo: action.payload};
        case SET_GAME_KEY:
            return {...state, gameKey: action.payload};
        case SET_SGF:
            return {...state, sgf: action.payload};
        case SET_PLAYER_COLOR:
            return {...state, playerColor: action.payload};
        case SET_GAME_KEY_BOT:
            return {...state, gameKeyBot: action.payload};
        case SET_SGF_BOT:
            return {...state, sgfBot: action.payload};
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

const GameContext = createContext(null);


export const GameProvider = ({children}) => {
    const [state, dispatch] = useReducer(gameReducer, {}, getInitialState);

    useEffect(() => {
        localStorage.setItem("game_key", state.gameKey);
    }, [state.gameKey]);

    useEffect(() => {
        localStorage.setItem("game_sgf", state.sgf);
    }, [state.sgf]);

    useEffect(() => {
        localStorage.setItem("player_color", state.playerColor);
    }, [state.playerColor]);

    useEffect(() => {
        localStorage.setItem("game_key_bot", state.gameKeyBot);
    }, [state.gameKeyBot]);

    useEffect(() => {
        localStorage.setItem("game_sgf_bot", state.sgfBot);
    }, [state.sgfBot]);

    const setGameInfo = (info) => dispatch({type: SET_GAME_INFO, payload: info});
    const updateGameKey = (key) => dispatch({type: SET_GAME_KEY, payload: key});
    const updateSgf = (newSgf) => dispatch({type: SET_SGF, payload: newSgf});
    const setPlayerColor = (color) => dispatch({type: SET_PLAYER_COLOR, payload: color});
    const updateGameKeyBot = key => dispatch({type: SET_GAME_KEY_BOT, payload: key});
    const updateSgfBot = sgf => dispatch({type: SET_SGF_BOT, payload: sgf});

    const value = useMemo(
        () => ({
            gameInfo: state.gameInfo,
            gameKey: state.gameKey,
            sgf: state.sgf,
            playerColor: state.playerColor,
            gameKeyBot: state.gameKeyBot,
            sgfBot: state.sgfBot,
            setGameInfo,
            updateGameKey,
            updateSgf,
            setPlayerColor,
            updateGameKeyBot,
            updateSgfBot,
        }),
        [state]
    );

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
};
