import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [sgf, setSgf] = useState(() => {
        const storedSgf = localStorage.getItem("game_sgf");
        return storedSgf || "(;FF[4]GM[1]SZ[19])";
    });
    const [playerColor, setPlayerColor] = useState(() => {
        return localStorage.getItem("player_color") || null;
    });

    const updateSgf = (newSgf) => {
        setSgf(newSgf);
    };

    useEffect(() => {
        localStorage.setItem("game_sgf", sgf);
    }, [sgf]);

    useEffect(() => {
        if (playerColor !== null) {
            localStorage.setItem("player_color", playerColor);
        }
    }, [playerColor]);

    return (
        <GameContext.Provider value={{ sgf, updateSgf, playerColor, setPlayerColor }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
