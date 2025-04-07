import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameInfo, setGameInfo] = useState(null);

    const [sgf, setSgf] = useState(() => {
        const storedSgf = localStorage.getItem("game_sgf");
        return storedSgf || "(;FF[4]GM[1]SZ[19])";
    });
    const [playerColor, setPlayerColor] = useState(() => {
        return localStorage.getItem("player_color") || null;
    });

    useEffect(() => {
        localStorage.setItem("game_sgf", sgf);
    }, [sgf]);

    useEffect(() => {
        if (playerColor !== null) {
            localStorage.setItem("player_color", playerColor);
        }
    }, [playerColor]);

    const updateSgf = (newSgf) => {
        setSgf(newSgf);
    };

    return (
        <GameContext.Provider
            value={{
                gameInfo,
                setGameInfo,
                sgf,
                updateSgf,
                playerColor,
                setPlayerColor,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => useContext(GameContext);
