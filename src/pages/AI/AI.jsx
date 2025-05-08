import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoPlayerAI from "../../components/GoPlayers/GoPlayerAI.jsx";
import AnalysisDialog from "../../components/AnalysisDialog/AnalysisDialog.jsx";
import { newBotGame } from "../../services/API/aiApi.js";
import { analyseCurrent, leaveGame } from "../../services/API/gameApi.js";
import { GameProvider, useGame } from "../../contexts/GameContext.jsx";
import styles from "../Game/Game.module.css";

function AIContent() {
    const navigate = useNavigate();
    const {
        sgf,
        updateSgf,
        playerColor,
        setPlayerColor,
        gameKey,
        setGameKey,
    } = useGame();

    const [analysis, setAnalysis] = useState(null);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

    useEffect(() => {
        setPlayerColor("b");
        (async () => {
            try {
                const resp = await newBotGame();
                const { Status, Body } = resp.data;
                if (Status === 200 && Body.sgf) {
                    updateSgf(Body.sgf);
                    if (Body.secret_key) setGameKey(Body.secret_key);
                } else if (Status === 400 && Body.secret_key) {
                    setGameKey(Body.secret_key);
                }
            } catch (err) {
                console.error("Ошибка создания игры с ботом:", err);
            }
        })();
    }, [setPlayerColor]);

    const handleAnalyse = async () => {
        if (!gameKey) return;
        setIsAnalysing(true);
        try {
            const resp = await analyseCurrent(gameKey);
            if (resp.data.Status === 200) {
                setAnalysis(resp.data);
                setIsAnalysisOpen(true);
            }
        } catch (err) {
            console.error("Ошибка анализа игры:", err);
        } finally {
            setIsAnalysing(false);
        }
    };

    const closeAnalyse = () => setIsAnalysisOpen(false);

    const handleLeave = async () => {
        if (!gameKey) return navigate("/");
        try {
            await leaveGame(gameKey);
        } catch (err) {
            console.error("Ошибка выхода из игры:", err);
        } finally {
            navigate("/");
        }
    };

    return (
        <div className="main-container">
            <div className={styles.container}>
                <h2 style={{ textAlign: "center" }}>Игра с KataGo</h2>
                <button onClick={handleLeave} className={styles.leaveButton}>
                    Выйти
                </button>
                <button
                    onClick={handleAnalyse}
                    className={styles.leaveButton}
                    disabled={isAnalysing}
                    style={{ marginLeft: 8 }}
                >
                    {isAnalysing ? "Анализ..." : "Анализ игры"}
                </button>
            </div>

            <GoPlayerAI
                mode="ai"
                playerColor={playerColor}
            />

            {isAnalysisOpen && (
                <AnalysisDialog analysis={analysis} onClose={closeAnalyse} />
            )}
        </div>
    );
}

export default function AI() {
    return (
        <GameProvider>
            <AIContent />
        </GameProvider>
    );
}
