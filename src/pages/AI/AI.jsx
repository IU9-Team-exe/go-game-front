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
        updateSgfBot,
        gameKeyBot,
        updateGameKeyBot,
    } = useGame();

    const [analysis, setAnalysis] = useState(null);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const resp = await newBotGame();
                const { Status, Body } = resp.data;
                if (Status === 200 && Body.sgf) {
                    updateSgfBot(Body.sgf);
                    if (Body.secret_key) updateGameKeyBot(Body.secret_key);
                } else if (Status === 400 && Body.secret_key) {
                    updateGameKeyBot(Body.secret_key);
                }
            } catch (err) {
                console.error("Ошибка создания игры с ботом:", err);
            }
        })();
    }, [gameKeyBot]);

    const handleAnalyse = async () => {
        if (!gameKeyBot) return;
        setIsAnalysing(true);
        try {
            const resp = await analyseCurrent(gameKeyBot);
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
        if (!gameKeyBot) return navigate("/");
        try {
            await leaveGame(gameKeyBot);
        } catch (err) {
            console.error("Ошибка выхода из игры:", err);
        } finally {
            updateGameKeyBot(null);
            updateSgfBot(null);
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
                playerColor={"b"}
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
