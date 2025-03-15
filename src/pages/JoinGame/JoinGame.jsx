import React, { useState } from 'react';
import styles from './JoinGame.module.css';

function JoinGame() {
    const [gameCode, setGameCode] = useState('');

    const handleJoin = () => {
        console.log(`Попытка подключения к игре с кодом: ${gameCode}`);
    };

    return (
        <div className={styles.container}>
            <h2>Подключиться к игре</h2>
            <p>Введите 4-значный код:</p>
            <input
                type="text"
                maxLength={4}
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Например, 1234"
                className={styles.inputField}
            />
            <button onClick={handleJoin} className={styles.joinButton}>
                Подключиться
            </button>
        </div>
    );
}

export default JoinGame;
