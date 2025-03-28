import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [sgf, setSgf] = useState("(;FF[4]GM[1]SZ[19])");

    const updateSgf = (newSgf) => {
        setSgf(newSgf);
    };

    return (
        <GameContext.Provider value={{ sgf, updateSgf }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
