#### /App.css

```

```

#### /App.jsx

```
import React from "react";
import AppRouter from "./routes/AppRouter";
import Header from "./components/header/Header";

function App() {
    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    );
}

export default App;

```

#### /index.css

```
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap');

:root {
  /* Шрифты */
  --font-family-base: 'Noto Sans JP', system-ui, Avenir, Helvetica, Arial, sans-serif;
  --font-family-serif: 'Noto Serif SC', serif;
  --font-size-base: 16px;
  --font-weight-normal: 400;
  --font-weight-bold: 700;

  /* Цвета темы */
  --color-background: #f8f4e9; /* Светло-бежевый, как бумага для каллиграфии */
  --color-text: #3a3226; /* Темно-коричневый, как тушь */
  --color-primary: #a67c52; /* Древесный, как гобан */
  --color-primary-dark: #78350f; /* Темно-янтарный для акцентов */
  --color-primary-light: #e6d5b8; /* Светлое дерево/песок */
  --color-secondary: #3a3226; /* Темная тушь */
  --color-stone-black: #222222;
  --color-stone-white: #ffffff;
  --color-accent: #c0392b; /* Красный акцент, как печать */
  --color-text-on-dark: #f8f4e9; /* Текст на темном фоне */
  --color-text-on-light: #3a3226; /* Текст на светлом фоне */

  /* Переменные для теней и границ */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --border-radius: 8px;
  --border-color: rgba(58, 50, 38, 0.2); /* Полупрозрачный цвет туши */
}

/* Глобальные стили для документа */
body {
  font-family: var(--font-family-base), serif;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: 1.6; /* Немного увеличим для лучшей читаемости */
  color: var(--color-text);
  background-color: var(--color-background);
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

/* Заголовки */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-serif), serif; /* Используем Serif для заголовков */
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  color: var(--color-primary-dark); /* Темно-янтарный для заголовков */
  margin-bottom: 0.8em;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }


/* Стилизация ссылок */
a {
  font-weight: 500;
  color: var(--color-primary-dark);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}
a:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

/* Универсальные стили для кнопок */
button {
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: inherit;
  font-weight: var(--font-weight-bold); /* Сделаем текст кнопок жирным */
  font-family: inherit;
  background-color: var(--color-primary-dark); /* Основной цвет кнопки */
  color: var(--color-text-on-dark);
  cursor: pointer;
  transition: background-color 0.25s, border-color 0.25s;
  box-shadow: var(--shadow-sm);
}
button:hover {
  background-color: var(--color-primary); /* Светлее при наведении */
  border-color: var(--color-secondary);
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color; /* Стандартный фокус */
}
button:disabled {
    background-color: #a0a0a0; /* Серый для неактивных кнопок */
    color: #e0e0e0;
    cursor: not-allowed;
    box-shadow: none;
}

/* Стили для input */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="Username"], /* Добавим для единообразия с AuthForm */
input[type="Password"], /* Добавим для единообразия с AuthForm */
select {
  padding: 0.6em 0.8em;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: #fff;
  color: var(--color-text);
  font-size: inherit;
  font-family: inherit;
  box-shadow: inset var(--shadow-sm);
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(166, 124, 82, 0.3); /* Голубое свечение при фокусе */
}

/* Класс для имитации фона гобана */
.go-board-bg {
    background-color: var(--color-primary-light); /* Цвет дерева */
    background-image: url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 0 V40 M0 20 H40" stroke="%233a3226" stroke-width="0.5" opacity="0.3"/><circle cx="10" cy="10" r="1.5" fill="%233a3226" opacity="0.4"/><circle cx="10" cy="30" r="1.5" fill="%233a3226" opacity="0.4"/><circle cx="30" cy="10" r="1.5" fill="%233a3226" opacity="0.4"/><circle cx="30" cy="30" r="1.5" fill="%233a3226" opacity="0.4"/><circle cx="20" cy="20" r="1.5" fill="%233a3226" opacity="0.4"/></svg>');
    background-size: 40px 40px;
}

/* Классы для камней (можно использовать для декора) */
.go-stone {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
}

.go-stone-white {
    background: radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0);
}

.go-stone-black {
    background: radial-gradient(circle at 30% 30%, #555555, #222222);
}

/* Контейнер для центрирования контента */
.main-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
}


/* Поддержка тёмной темы (если понадобится в будущем) */
/* @media (prefers-color-scheme: dark) { */
/*   :root { */
/*     --color-background: #242424; */
/*     --color-text: rgba(255, 255, 255, 0.87); */
/*   } */
/* } */
```

#### /main.jsx

```
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from "./contexts/AuthContext";
import {GameProvider} from "./contexts/GameContext.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <GameProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </GameProvider>
        </AuthProvider>
    </QueryClientProvider>
);

```

#### /components/ArchiveGameCard/ArchiveGameCard.jsx

```
import React from "react";
import {Link} from "react-router-dom";
import styles from "./ArchiveGameCard.module.css";

function ArchiveGameCard({game}) {
    const {
        game_id,
        BlackPlayer,
        BlackRank,
        WhitePlayer,
        WhiteRank,
        Date,
        Result,
        Event,
        BoardSize,
        Komi,
        Sgf
    } = game;

    const formatResult = (res) => {
        if (!res || !res.WinColor) return "N/A";
        const winner = res.WinColor === "B" ? "Чёрные" : res.WinColor === "W" ? "Белые" : "Ничья";
        if (res.Reason === "resign") return `${winner} (сдача)`;
        if (res.Reason === "time") return `${winner} (время)`;
        if (res.Reason === "score" && res.PointDiff != null) return `${winner} +${res.PointDiff}`;
        if (res.PointDiff != null) return `${winner} +${res.PointDiff}`;
        return winner;
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("ru-RU");
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className={styles.gameCard}>
            <div className={styles.eventDate}>
                <span className={styles.event}>{Event || "Неизвестное событие"}</span>
                <span className={styles.date}>{formatDate(Date)}</span>
            </div>

            <div className={styles.players}>
                <div className={styles.playerInfo}>
                    <span className={`${styles.stone} ${styles.blackStone}`}></span>
                    <span className={styles.playerName}>{BlackPlayer || "Игрок"}</span>
                    <span className={styles.playerRank}>({BlackRank || "?"})</span>
                </div>
                <div className={styles.vs}>vs</div>
                <div className={styles.playerInfo}>
                    <span className={`${styles.stone} ${styles.whiteStone}`}></span>
                    <span className={styles.playerName}>{WhitePlayer || "Игрок"}</span>
                    <span className={styles.playerRank}>({WhiteRank || "?"})</span>
                </div>
            </div>

            <div className={styles.details}>
                <span>Доска: {BoardSize || 19}x{BoardSize || 19}</span>
                <span>Коми: {Komi != null ? Komi : "N/A"}</span>
            </div>

            <div className={styles.result}>
                <strong>Результат:</strong> {formatResult(Result)}
            </div>

            {Sgf && (
                <>
                    <a
                        href={Sgf}
                        download="sgf.txt"
                        className={styles.sgfLink}
                        title="Скачать SGF"
                    >
                        Скачать SGF
                    </a>
                    <Link
                        to={`/archive/game/${game_id}`}
                        className={styles.viewGameButton}
                        title="Посмотреть партию"
                    >
                        Посмотреть партию
                    </Link>
                </>
            )}
        </div>
    );
}

export default ArchiveGameCard;

```

#### /components/ArchiveGameCard/ArchiveGameCard.module.css

```
.gameCard {
    background-color: rgba(255, 255, 255, 0.9); /* Полупрозрачный фон */
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem 1.2rem; /* Увеличим паддинги */
    box-shadow: var(--shadow-md);
    transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 0.8rem; /* Отступы между секциями карточки */
}

.gameCard:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-3px);
}

.eventDate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--color-secondary);
    opacity: 0.8;
    border-bottom: 1px dashed var(--border-color); /* Разделитель */
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
}

.event {
    font-weight: 500;
}

.players {
    display: flex;
    flex-direction: column; /* Игроки друг под другом */
    gap: 0.5rem; /* Отступ между игроками */
    align-items: center; /* Центрируем блок */
}

.playerInfo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%; /* Растягиваем блок информации об игроке */
    justify-content: center; /* Центрируем контент внутри блока */
}

.stone {
    width: 1.2em; /* Размер камня */
    height: 1.2em;
    border-radius: 50%;
    display: inline-block;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0; /* Предотвращаем сжатие камня */
}

.blackStone {
    background: radial-gradient(circle at 30% 30%, #555555, #222222);
}

.whiteStone {
    background: radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0);
    border: 1px solid #ccc; /* Небольшая граница для белого камня */
}

.playerName {
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    flex-grow: 1; /* Позволяем имени занять доступное место */
    text-align: center; /* Центрируем имя */
    overflow: hidden; /* Обрезаем слишком длинные имена */
    text-overflow: ellipsis;
    white-space: nowrap;
}

.playerRank {
    font-size: 0.9em;
    color: var(--color-secondary);
    opacity: 0.9;
}

.vs {
    font-family: var(--font-family-serif);
    font-weight: bold;
    color: var(--color-primary);
    margin: 0.1rem 0; /* Небольшие отступы */
}


.details {
    display: flex;
    justify-content: space-around; /* Распределяем детали */
    font-size: 0.9rem;
    color: var(--color-secondary);
    opacity: 0.9;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--border-color); /* Разделитель */
}

.result {
    font-weight: 500;
    color: var(--color-primary-dark);
    text-align: center; /* Центрируем результат */
}

.result strong {
    font-weight: var(--font-weight-bold);
    color: var(--color-secondary);
}

.sgfLink {
    display: inline-block; /* Чтобы кнопка не растягивалась */
    margin: 0.5rem auto 0 auto; /* Отступы и центрирование */
    padding: 0.4em 0.8em;
    background-color: var(--color-primary);
    color: var(--color-text-on-dark);
    border-radius: 4px;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background-color 0.2s;
    text-align: center;
}

.sgfLink:hover {
    background-color: var(--color-primary-dark);
    color: var(--color-text-on-dark);
    text-decoration: none;
}

.viewGameButton {
    display: inline-block;
    margin: 0.5rem auto 0 auto;
    padding: 0.4em 0.8em;
    background-color: var(--color-secondary);
    color: var(--color-text-on-dark);
    border-radius: 4px;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background-color 0.2s;
    text-align: center;
}

.viewGameButton:hover {
    background-color: var(--color-secondary-dark, #5a5246);
}

```

#### /components/AuthForm/AuthForm.jsx

```
import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const AuthForm = ({ onSubmit, error, isLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password });
    };

    return (
        // Добавляем класс для фона и центрирования
        <div className={styles.formContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2>Авторизация</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        type="Username" // Оставляем тип для совместимости, если он где-то используется
                        placeholder="Введите имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        type="Password" // Оставляем тип для совместимости
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? "Вход..." : "Войти"}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
```

#### /components/AuthForm/AuthForm.module.css

```
.formContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(80vh - 64px); /* Примерная высота для центрирования */
    padding: 2rem;
    /* Можно добавить фон go-board-bg, если нужно */
    /* background-color: var(--color-primary-light);
    background-image: url('data:image/svg+xml;utf8,<svg ...>'); */
}

.authForm {
    background-color: rgba(255, 255, 255, 0.9); /* Полупрозрачный фон формы */
    padding: 2rem 2.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    width: 100%;
    max-width: 400px; /* Максимальная ширина формы */
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Отступы между элементами */
}

.authForm h2 {
    text-align: center;
    color: var(--color-primary-dark);
    margin-bottom: 0.5rem; /* Уменьшим отступ снизу */
    font-family: var(--font-family-serif);
}

.inputGroup {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Отступ между label и input */
}

.inputGroup label {
    font-weight: 500;
    color: var(--color-secondary);
}

/* Стили для input уже заданы глобально в index.css */
/* .authForm input { ... } */

.error {
    color: var(--color-accent); /* Красный цвет для ошибок */
    text-align: center;
    font-size: 0.9rem;
    margin: -0.5rem 0 0.5rem 0; /* Скорректируем отступы */
}

.submitButton {
    margin-top: 0.5rem; /* Небольшой отступ сверху */
    padding: 0.8em 1.5em; /* Увеличим паддинги */
    font-size: 1rem;
    background-color: var(--color-primary-dark);
    color: var(--color-text-on-dark);
}

.submitButton:hover {
    background-color: var(--color-primary);
}

.submitButton:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
}
```

#### /components/GoPlayers/GoPlayerAI.jsx

```
import React, {useEffect, useRef} from "react";
import {callAIMove} from "../../services/API/aiApi";
import {parseCoords, extractMoves} from "../../utils/conversionUtils";
import {useResponsiveBoardSize} from "../../utils/useResponsiveBoardSize.js";

const GoPlayerAI = ({sgf = "(;FF[4]GM[1]SZ[19])", options = {}}) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = {width: boardSize, height: boardSize, sgf, ...options};
            playerOptions.layout = {top: [], bottom: [], left: [], right: []};
            playerOptions.enableKeys = false;

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);

            const originalPlay = editable.play;
            editable.play = function (x, y) {
                const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                if (currentTurn !== "b") {
                    console.warn("Ход не разрешен: не ваша очередь.");
                    return;
                }
                originalPlay.call(this, x, y);

                const currentSgf = player.kifuReader.kifu.toSgf();
                const moves = extractMoves(currentSgf, player.kifu.size);
                console.log(moves);

                callAIMove(moves)
                    .then((response) => {
                        const {bot_move} = response.data;
                        if (!bot_move) {
                            console.error("Сервер не вернул bot_move");
                            return;
                        }
                        const {x: botX, y: botY} = parseCoords(bot_move.coordinates, player.kifu.size);
                        originalPlay.call(this, botX, botY);
                    })
                    .catch((err) => {
                        console.error("Ошибка получения хода от ИИ:", err);
                    });
            };

            if (editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            editable._ev_click = editable.play.bind(editable);
            player.board.addEventListener("click", editable._ev_click);

            playerRef.current = player;
        }
    }, [boardSize, sgf, options]);

    useEffect(() => {
        const handleWheel = (e) => e.preventDefault();
        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, {passive: false});
        }
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel, {passive: false});
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{width: boardSize, height: boardSize, overflow: "hidden"}}
        />
    );
};

export default GoPlayerAI;

```

#### /components/GoPlayers/GoPlayerArchive.jsx

```
import React, { useRef, useEffect } from "react";
import { useResponsiveBoardSize } from "../../utils/useResponsiveBoardSize.js";

const GoPlayerArchive = ({ sgf = "(;FF[4]GM[1]SZ[19])", options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = { width: boardSize, height: boardSize, sgf, ...options };
            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            playerRef.current = player;
        }
    }, [boardSize, sgf, options]);

    return (
        <div
            ref={containerRef}
            style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
        />
    );
};

export default GoPlayerArchive;

```

#### /components/GoPlayers/GoPlayerMultiplayer.jsx

```
import React, {useEffect, useRef} from "react";
import {convertCoords, parseCoords} from "../../utils/conversionUtils";
import {useGame} from "../../contexts/GameContext.jsx";
import {useResponsiveBoardSize} from "../../utils/useResponsiveBoardSize.js";

const GoPlayerMultiplayer = ({
                                 initialSgf = "(;FF[4]GM[1]SZ[19])",
                                 options = {},
                                 onSendMove,
                                 incomingMove,
                             }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const editableRef = useRef(null);
    const originalPlayRef = useRef(null);
    const {playerColor} = useGame();
    const boardSize = useResponsiveBoardSize(20);

    useEffect(() => {
        if (window.WGo && window.WGo.Player && containerRef.current) {
            containerRef.current.innerHTML = "";
            const playerOptions = {
                width: boardSize,
                height: boardSize,
                sgf: initialSgf,
                ...options,
            };
            playerOptions.layout = {top: [], bottom: [], left: [], right: []};
            playerOptions.enableKeys = false;

            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            playerRef.current = player;
            editableRef.current = editable;
            const originalPlay = editable.play;
            originalPlayRef.current = originalPlay;
            editable.play = function (x, y) {
                const currentTurn = this.player.kifuReader.game.turn === window.WGo.B ? "b" : "w";
                if (currentTurn !== playerColor) {
                    console.warn("Ход не разрешен: не ваша очередь.");
                    return;
                }
                originalPlay.call(this, x, y);
                const moveStr = convertCoords(x, y, player.kifu.size);
                const message = {
                    color: playerColor === "b" ? "black" : "white",
                    coordinates: moveStr,
                };
                onSendMove?.(message);
            };

            if (editable._ev_click) {
                player.board.removeEventListener("click", editable._ev_click);
            }
            editable._ev_click = editable.play.bind(editable);
            player.board.addEventListener("click", editable._ev_click);
            setTimeout(() => {
                player.last();
            }, 0);
        }
        return () => {
            if (playerRef.current) {
                playerRef.current = null;
            }
        };
    }, [initialSgf, boardSize, options, playerColor, onSendMove]);

    useEffect(() => {
        const handleWheel = (e) => e.preventDefault();
        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, {passive: false});
        }
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel, {passive: false});
            }
        };
    }, []);

    useEffect(() => {
        if (!incomingMove) return;
        if (!editableRef.current || !originalPlayRef.current) return;

        const {color, coordinates} = incomingMove;
        const size = playerRef.current?.kifu?.size || 19;
        const {x, y} = parseCoords(coordinates, size);
        const wgoColor = color === "black" ? window.WGo.B : window.WGo.W;
        originalPlayRef.current.call(editableRef.current, x, y, wgoColor);
    }, [incomingMove]);

    return (
        <div
            ref={containerRef}
            style={{width: boardSize, height: boardSize, overflow: "hidden"}}
        />
    );
};

export default GoPlayerMultiplayer;

```

#### /components/GoPlayers/GoPlayerOffline.jsx

```
import React, { useEffect, useRef } from "react";
import {useResponsiveBoardSize} from "../../utils/useResponsiveBoardSize.js";

const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const GoPlayerOffline = ({ sgf = defaultSgf, options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = { width: boardSize, height: boardSize, sgf, ...options };
            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            playerRef.current = player;
        }
    }, [boardSize, sgf, options]);

    useEffect(() => {
        const handleWheel = (e) => e.preventDefault();
        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel, { passive: false });
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
        />
    );
};

export default GoPlayerOffline;

```

#### /components/header/Header.jsx

```
import React from "react";
import { Link, NavLink } from "react-router-dom"; // Используем NavLink для activeClassName
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { logout as apiLogout } from "../../services/API/authApi";

// Иконка камня Го (простая)
const GoStoneIcon = () => (
    <div className={styles.goStoneIconContainer}>
        <div className={styles.goStoneIconOuter}>
            <div className={styles.goStoneIconInner}></div>
        </div>
    </div>
);

const Header = () => {
    const { user, logout: contextLogout } = useAuth();

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        } finally {
            contextLogout();
        }
    };

    return (
        // Используем AppBar от MUI, но стилизуем его через CSS модуль
        <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logoLink}>
                        <GoStoneIcon />
                        <Typography variant="h6" component="div" className={styles.title}>
                            囲碁 {/* Go по-японски */}
                        </Typography>
                    </Link>
                    <nav className={styles.navigation}>
                        <NavLink to="/offline" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Offline
                        </NavLink>
                        <NavLink to="/create" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Создать
                        </NavLink>
                        <NavLink to="/join" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Присоединиться
                        </NavLink>
                        <NavLink to="/ai" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Играть с AI
                        </NavLink>
                        <NavLink to="/archive" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Архив
                        </NavLink>
                    </nav>
                </div>
                <div className={styles.right}>
                    {user ? (
                        <>
                            <Typography variant="subtitle1" className={styles.nickname}>
                                {user.username} {/* Отображаем username */}
                            </Typography>
                            {/* Используем стилизованную кнопку */}
                            <button onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`}>
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Используем стилизованные кнопки вместо Link */}
                            <Link to="/login">
                                <button className={`${styles.button} ${styles.loginButton}`}>
                                    Войти
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className={`${styles.button} ${styles.registerButton}`}>
                                    Регистрация
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
```

#### /components/header/Header.module.css

```
/* Стили для AppBar (хедер) */
.appBar {
    background-color: var(--color-primary-dark) !important; /* Темно-янтарный */
    color: var(--color-text-on-dark) !important; /* Светлый текст */
    box-shadow: var(--shadow-lg);
    font-family: var(--font-family-base);
}

/* Стили для Toolbar */
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1.5rem; /* Немного больше паддинги */
    flex-wrap: wrap; /* Позволяем переносить элементы на маленьких экранах */
}

.left {
    display: flex;
    align-items: center;
    gap: 1.5rem; /* Увеличим отступ */
}

.right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Стили для логотипа */
.logoLink {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: inherit;
    text-decoration: none;
}

.goStoneIconContainer {
    width: 36px; /* Размер иконки */
    height: 36px;
    border-radius: 50%;
    background-color: var(--color-stone-black); /* Черный камень */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px; /* Отступ для внутреннего камня */
    box-shadow: var(--shadow-sm);
}

.goStoneIconOuter {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--color-stone-white); /* Белый камень */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
}

.goStoneIconInner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--color-stone-black); /* Центральная точка */
}


.title {
    font-family: var(--font-family-serif) !important; /* Serif для названия */
    font-weight: bold !important;
    font-size: 1.5rem !important; /* Немного увеличим */
    color: var(--color-text-on-dark);
}

/* Стили для навигации */
.navigation {
     display: flex;
     gap: 1.2rem; /* Отступ между ссылками */
}

/* Стили для ссылок */
.link {
    color: var(--color-text-on-dark);
    text-decoration: none;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;
    font-weight: 500;
}

.link:hover,
.link:focus {
    background-color: rgba(248, 244, 233, 0.1); /* Легкий фон при наведении */
    color: #fff; /* Ярче при наведении */
    text-decoration: none;
}

.activeLink {
    background-color: rgba(248, 244, 233, 0.2); /* Активная ссылка */
    font-weight: var(--font-weight-bold);
}

/* Стили для кнопок (если не используются MUI Button) */
.button {
    border-radius: var(--border-radius);
    border: 1px solid transparent;
    padding: 0.5em 1em; /* Немного меньше паддинги */
    font-size: 0.9rem; /* Чуть меньше шрифт */
    font-weight: var(--font-weight-bold);
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.25s, border-color 0.25s;
    box-shadow: var(--shadow-sm);
}

.loginButton {
    background-color: var(--color-primary); /* Деревянный */
    color: var(--color-text-on-dark);
    border: 1px solid var(--color-primary-dark);
}
.loginButton:hover {
    background-color: #c79d6f; /* Светлее деревянный */
    border-color: var(--color-secondary);
}

.registerButton {
    background-color: var(--color-secondary); /* Темная тушь */
    color: var(--color-text-on-dark);
    border: 1px solid var(--color-primary);
}
.registerButton:hover {
    background-color: #5a5246; /* Светлее тушь */
     border-color: var(--color-primary-dark);
}

.logoutButton {
     background-color: transparent;
     color: var(--color-text-on-dark);
     border: 1px solid var(--color-text-on-dark);
}

.logoutButton:hover {
     background-color: rgba(248, 244, 233, 0.1);
     border-color: #fff;
}

/* Отображение имени пользователя */
.nickname {
    color: var(--color-text-on-dark);
    font-weight: 500;
    margin-right: 0.5rem; /* Отступ справа от имени */
}

/* Адаптивность */
@media (max-width: 768px) {
    .toolbar {
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
    }
    .left {
        margin-bottom: 1rem;
        flex-wrap: wrap; /* Позволяем переносить лого и навигацию */
         gap: 1rem;
    }
    .navigation {
        gap: 0.8rem; /* Уменьшаем отступы */
        margin-top: 0.5rem; /* Отступ сверху для навигации */
    }
    .right {
        width: 100%;
        justify-content: flex-end; /* Кнопки справа */
    }
    .title {
        font-size: 1.3rem !important;
    }
    .link {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .left {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }
    .navigation {
        width: 100%;
        justify-content: space-around; /* Распределяем ссылки */
    }
    .right {
       margin-top: 1rem;
       justify-content: center; /* Центрируем кнопки */
    }
    .button {
        padding: 0.4em 0.8em;
    }
}
```

#### /components/RegisterForm/RegisterForm.jsx

```
import React, { useState } from "react";
// Используем стили от AuthForm для единообразия
import styles from "../AuthForm/AuthForm.module.css";

const RegisterForm = ({ onSubmit, error, isLoading }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordError, setPasswordError] = useState(""); // Состояние для ошибки паролей

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError(""); // Сброс ошибки паролей
        if (password !== confirm) {
            setPasswordError("Пароли не совпадают"); // Установка ошибки
            return;
        }
        onSubmit({ email, username, password });
    };

    return (
        // Используем тот же контейнер, что и в AuthForm для центрирования
        <div className={styles.formContainer}>
            {/* Используем класс .authForm для стилизации самой формы */}
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Введите имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirm">Повторите пароль:</label>
                    <input
                        id="confirm"
                        type="password"
                        placeholder="Повторите пароль"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={isLoading} // Добавляем disabled при загрузке
                    />
                </div>
                {/* Отображаем ошибки */}
                {passwordError && <p className={styles.error}>{passwordError}</p>}
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
```

#### /components/RegisterForm/RegisterForm.module.css

```
/* Этот файл теперь пуст или может быть удален,
   так как все стили берутся из AuthForm.module.css */
/* @import url("../AuthForm/AuthForm.module.css"); <-- Можно оставить для ясности, но не обязательно */

/* Если потребуются специфичные стили ТОЛЬКО для регистрации,
   можно добавить их сюда с использованием уникального класса, например: */
/*
.specificRegisterStyle {
    margin-top: 5px;
}
*/

/* Но для полного соответствия дизайну авторизации, этот файл остается пустым */
```

#### /contexts/AuthContext.jsx

```
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

```

#### /contexts/GameContext.jsx

```
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

```

#### /pages/AI/AI.jsx

```
import GoPlayerAI from "../../components/GoPlayers/GoPlayerAI.jsx";

function AI() {
    const playerColor = "b";

    return (
        <div>
            <h2 style={{ textAlign: 'center'}}>Игра с KataGo</h2>
            <GoPlayerAI mode="ai" playerColor={playerColor} />
        </div>
    );
}

export default AI;

```

#### /pages/Archive/Archive.jsx

```
import React, {useEffect, useState} from "react";
import {getNamesInArchive, getYearsInArchive, getArchive} from "../../services/API/archiveApi";
import GameCard from "../../components/ArchiveGameCard/ArchiveGameCard";
import styles from "./Archive.module.css";

function ArchivePage() {
    const [years, setYears] = useState([]);
    const [yearsLocalPage, setYearsLocalPage] = useState(1);
    const [yearsPerPage] = useState(10);

    const [names, setNames] = useState([]);
    const [namesPage, setNamesPage] = useState(1);
    const [namesTotalPages, setNamesTotalPages] = useState(1);
    const [namesPerPage] = useState(20);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const [games, setGames] = useState([]);
    const [archivePage, setArchivePage] = useState(1);
    const [archiveTotalPages, setArchiveTotalPages] = useState(1);
    const [isLoadingGames, setIsLoadingGames] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getYearsInArchive()
            .then((response) => {
                setYears(response.data.Body.years || []);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить список лет.");
            });

        loadNames(1);
    }, []);

    const loadNames = (page) => {
        getNamesInArchive(page, namesPerPage)
            .then((response) => {
                const {names, page: currentPage, pages_total} = response.data.Body;
                setNames(names || []);
                setNamesPage(currentPage);
                setNamesTotalPages(pages_total);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить список игроков.");
            });
    };

    const handleNamesPrev = () => {
        if (namesPage > 1) {
            loadNames(namesPage - 1);
        }
    };
    const handleNamesNext = () => {
        if (namesPage < namesTotalPages) {
            loadNames(namesPage + 1);
        }
    };

    const handleYearsPrev = () => {
        setYearsLocalPage((prev) => Math.max(1, prev - 1));
    };
    const handleYearsNext = () => {
        const maxLocalPages = Math.ceil(years.length / yearsPerPage);
        setYearsLocalPage((prev) => Math.min(maxLocalPages, prev + 1));
    };
    const visibleYears = years.slice(
        (yearsLocalPage - 1) * yearsPerPage,
        yearsLocalPage * yearsPerPage
    );
    const maxYearsLocalPages = Math.ceil(years.length / yearsPerPage);

    const loadArchiveGames = (page = 1) => {
        if (!selectedYear && !selectedName) {
            setError("Выберите год или имя игрока для поиска.");
            setGames([]);
            setArchiveTotalPages(1);
            setArchivePage(1);
            return;
        }
        setError(null);
        setIsLoadingGames(true);

        getArchive(selectedYear, selectedName, page)
            .then((response) => {
                const {games: fetchedGames, page: currentPage, pages_total} = response.data.Body;
                setGames(fetchedGames || []);
                setArchivePage(currentPage);
                setArchiveTotalPages(pages_total);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить игры.");
                setGames([]);
            })
            .finally(() => {
                setIsLoadingGames(false);
            });
    };

    const handleArchivePrev = () => {
        if (archivePage > 1) {
            loadArchiveGames(archivePage - 1);
        }
    };
    const handleArchiveNext = () => {
        if (archivePage < archiveTotalPages) {
            loadArchiveGames(archivePage + 1);
        }
    };

    const handleShowGames = () => {
        setArchivePage(1);
        loadArchiveGames(1);
    };

    return (
        <div className={`${styles.archiveContainer} main-container`}>
            <h2>Архив профессиональных игр Го</h2>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.filters}>
                <div className={styles.filterBlock}>
                    <label htmlFor="year-select">Год:</label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">Все года</option>
                        {visibleYears.map((y) => (
                            <option key={y.year} value={y.year}>
                                {y.year} ({y.count_of_games} игр)
                            </option>
                        ))}
                    </select>
                    {years.length > yearsPerPage && (
                        <div className={styles.paginationControls}>
                            <button onClick={handleYearsPrev} disabled={yearsLocalPage <= 1}>
                                ←
                            </button>
                            <span>
                                {yearsLocalPage} / {maxYearsLocalPages}
                            </span>
                            <button onClick={handleYearsNext} disabled={yearsLocalPage >= maxYearsLocalPages}>
                                →
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.filterBlock}>
                    <label htmlFor="name-select">Игрок:</label>
                    <select
                        id="name-select"
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">Все игроки</option>
                        {names.map((player) => (
                            <option key={player.name} value={player.name}>
                                {player.name} ({player.count_of_games} игр)
                            </option>
                        ))}
                    </select>
                    {namesTotalPages > 1 && (
                        <div className={styles.paginationControls}>
                            <button onClick={handleNamesPrev} disabled={namesPage <= 1}>
                                ←
                            </button>
                            <span>
                                {namesPage} / {namesTotalPages}
                            </span>
                            <button onClick={handleNamesNext} disabled={namesPage >= namesTotalPages}>
                                →
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={handleShowGames} className={styles.showButton} disabled={isLoadingGames}>
                    {isLoadingGames ? "Загрузка..." : "Показать игры"}
                </button>
            </div>

            {isLoadingGames ? (
                <div className={styles.loadingIndicator}>Загрузка игр...</div>
            ) : games.length > 0 ? (
                <>
                    <div className={styles.gamesContainer}>
                        {games.map((game, index) => (
                            <GameCard key={index} game={game}/>
                        ))}
                    </div>
                    {archiveTotalPages > 1 && (
                        <div className={styles.gamesPagination}>
                            <button onClick={handleArchivePrev} disabled={archivePage <= 1}>
                                Предыдущая
                            </button>
                            <span>
                                Страница {archivePage} из {archiveTotalPages}
                            </span>
                            <button onClick={handleArchiveNext} disabled={archivePage >= archiveTotalPages}>
                                Следующая
                            </button>
                        </div>
                    )}
                </>
            ) : !isLoadingGames && (selectedYear || selectedName) ? (
                <p className={styles.noGamesMessage}>Игры по заданным фильтрам не найдены.</p>
            ) : null}
        </div>
    );
}

export default ArchivePage;
```

#### /pages/Archive/Archive.module.css

```
.archiveContainer {
    /* Использует .main-container из index.css */
    /* margin: 20px auto; */
    /* max-width: 1200px; */
    /* padding: 10px; */
}

.archiveContainer h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--color-primary-dark);
}

.filters {
    display: flex;
    flex-wrap: wrap; /* Перенос фильтров на маленьких экранах */
    gap: 1.5rem; /* Отступы между блоками фильтров */
    align-items: flex-end; /* Выравнивание по нижнему краю */
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: rgba(255, 255, 255, 0.7); /* Легкий фон для фильтров */
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
}

.filterBlock {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1; /* Позволяем блокам растягиваться */
    min-width: 200px; /* Минимальная ширина блока */
}

.filterBlock label {
    font-weight: 500;
    color: var(--color-secondary);
    margin-bottom: 0.2rem;
}

/* Стили для select и button наследуются из index.css */
.selectInput {
    width: 100%; /* Растягиваем select на всю ширину блока */
}

.showButton {
    padding: 0.6em 1.5em; /* Сделаем кнопку поиска чуть крупнее */
    align-self: flex-end; /* Прижимаем кнопку к низу */
}

.paginationControls {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Равномерное распределение кнопок и текста */
    gap: 0.5rem;
    margin-top: 0.5rem;
}
.paginationControls span {
    font-size: 0.9rem;
    color: var(--color-secondary);
}
.paginationControls button {
    padding: 0.3em 0.6em; /* Маленькие кнопки пагинации */
    font-size: 0.9rem;
    min-width: 30px; /* Минимальная ширина */
}

.gamesContainer {
    display: grid;
    /* Адаптивная сетка: 1 колонка на мобильных, 2 на средних, 3 на больших */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem; /* Отступы между карточками */
}

.gamesPagination {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
}
.gamesPagination span {
    font-size: 1rem;
    color: var(--color-secondary);
}
.gamesPagination button {
    padding: 0.5em 1em;
}

.loadingIndicator,
.noGamesMessage,
.error {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
    color: var(--color-secondary);
}

.error {
    color: var(--color-accent);
    font-weight: bold;
    background-color: rgba(192, 57, 43, 0.1);
    border: 1px solid var(--color-accent);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
}


/* Адаптивность для фильтров */
@media (max-width: 768px) {
    .filters {
        flex-direction: column;
        align-items: stretch; /* Растягиваем блоки на всю ширину */
    }
    .showButton {
        align-self: center; /* Центрируем кнопку */
        margin-top: 1rem;
        width: 50%; /* Ограничиваем ширину кнопки */
    }
     .gamesContainer {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}
```

#### /pages/ArchiveGame/ArchiveGame.jsx

```
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameFromArchiveById } from "../../services/API/archiveApi";
import styles from "./ArchiveGame.module.css";
import GoPlayerArchive from "../../components/GoPlayers/GoPlayerArchive.jsx";

const ArchiveGame = () => {
    const { gameId } = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [sgf, setSgf] = useState("(;FF[4]GM[1]SZ[19])");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getGameFromArchiveById(gameId)
            .then((response) => {
                if (response.data.Status === 200) {
                    const game = response.data.Body;
                    setGameInfo(game);
                    setSgf(game.Sgf || "(;FF[4]GM[1]SZ[19])");
                } else {
                    setError("Ошибка при получении данных игры.");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить информацию об игре.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [gameId]);

    if (isLoading) {
        return <div className={styles.loading}>Загрузка игры...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={`${styles.container} main-container`}>
            <h2 className={styles.title}>Архивная партия</h2>
            {gameInfo && (
                <div className={styles.gameDetails}>
                    <p>
                        <strong>Игроки:</strong> {gameInfo.BlackPlayer} vs {gameInfo.WhitePlayer}
                    </p>
                    <p>
                        <strong>Дата:</strong> {new Date(gameInfo.Date).toLocaleDateString("ru-RU")}
                    </p>
                    {gameInfo.Event && (
                        <p>
                            <strong>Событие:</strong> {gameInfo.Event}
                        </p>
                    )}
                </div>
            )}
            <div className={styles.playerContainer}>
                <GoPlayerArchive sgf={sgf} />
            </div>
        </div>
    );
};

export default ArchiveGame;

```

#### /pages/ArchiveGame/ArchiveGame.module.css

```
.container {
    margin: 20px auto;
    padding: 20px;
}

.title {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--color-primary-dark);
    font-family: var(--font-family-serif);
}

.gameDetails {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    color: var(--color-secondary);
}

.playerContainer {
    display: flex;
    justify-content: center;
}

.loading,
.error {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
}

.error {
    color: var(--color-accent);
}

```

#### /pages/CreateGame/CreateGame.jsx

```
import React, { useEffect, useState } from "react";
import { newGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGame.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useGame } from "../../contexts/GameContext"; // Импортируем useGame

function CreateGame() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setPlayerColor } = useGame(); // Получаем setPlayerColor
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleCreate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await newGame(); // Параметры по умолчанию на бэке
            const gameKey = response.data?.Body?.public_key;
            if (gameKey) {
                setPlayerColor("b"); // Создатель всегда начинает за черных
                navigate(`/game/${gameKey}`);
            } else {
                throw new Error("Не удалось получить ключ игры от сервера.");
            }
        } catch (err) {
            console.error("Ошибка создания игры", err);
            setError(err.response?.data?.Body?.ErrorDescription || err.message || "Не удалось создать игру. Попробуйте снова.");
            setIsLoading(false);
            // Не перенаправляем при ошибке
        }
        // Не нужно setIsLoading(false) при успехе, т.к. происходит редирект
    };

    return (
        <div className={`${styles.container} main-container`}> {/* Добавлен main-container */}
            <h2>Создать новую игру Го</h2>
            <p className={styles.description}>
                Нажмите кнопку ниже, чтобы создать новую игровую комнату.
                Вы будете играть за чёрных.
            </p>
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={handleCreate} className={styles.createButton} disabled={isLoading}>
                {isLoading ? "Создание..." : "Создать игру"}
            </button>
        </div>
    );
}

export default CreateGame;
```

#### /pages/CreateGame/CreateGame.module.css

```
.container {
    /* Использует .main-container из index.css */
   text-align: center;
   padding-top: 3rem; /* Отступ сверху */
   padding-bottom: 3rem;
   display: flex;
   flex-direction: column;
   align-items: center; /* Центрируем контент */
   gap: 1.5rem; /* Отступы между элементами */
}

.container h2 {
   color: var(--color-primary-dark);
   margin-bottom: 0.5rem;
}

.description {
   color: var(--color-secondary);
   max-width: 500px; /* Ограничиваем ширину текста */
   line-height: 1.6;
   margin-bottom: 1rem;
}

.createButton {
   padding: 0.8em 2em; /* Крупнее кнопка */
   font-size: 1.1rem;
   background-color: var(--color-primary-dark);
   color: var(--color-text-on-dark);
}

.createButton:hover {
   background-color: var(--color-primary);
}

.createButton:disabled {
   background-color: #a0a0a0;
   cursor: not-allowed;
}

.error {
   color: var(--color-accent);
   font-weight: 500;
   margin-top: 1rem;
   padding: 0.8rem;
   background-color: rgba(192, 57, 43, 0.1);
   border: 1px solid var(--color-accent);
   border-radius: var(--border-radius);
   max-width: 500px;
}
```

#### /pages/Game/Game.jsx

```
import { useParams, useNavigate } from "react-router-dom";
import GoPlayerMultiplayer from "../../components/GoPlayers/GoPlayerMultiplayer.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";
import React, { useEffect, useRef, useCallback, useState } from "react";
import styles from "../Game/Game.module.css";
import { getGameInfo, leaveGame } from "../../services/API/gameApi.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {fixSgfFormat} from "../../utils/conversionUtils.js";

const WS_URL_BASE = "ws://localhost:8080/api/startGame";

function GameContent() {
    const { gameKey } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Достаём из контекста:
    const {
        gameInfo,
        setGameInfo,
        sgf,
        updateSgf,
        playerColor,
        setPlayerColor
    } = useGame();

    const [incomingMove, setIncomingMove] = useState(null);
    const unmountedRef = useRef(false);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!playerColor) {
            setPlayerColor("b");
        }
    }, [playerColor, setPlayerColor]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getGameInfo(gameKey);
                if (response.data?.Status === 200) {
                    const body = response.data.Body;
                    setGameInfo(body);

                    const rawSgf = (body?.sgf || "").trim();
                    const cleanedSgf = fixSgfFormat(rawSgf || "(;FF[4]GM[1]SZ[19])");

                    if (cleanedSgf !== sgf) {
                        updateSgf(cleanedSgf);
                    }
                }
            } catch (error) {
                console.error("Ошибка getGameInfo:", error);
            }
        })();
    }, [gameKey]);

    const connectSocket = useCallback(() => {
        const socketUrl = `${WS_URL_BASE}?game_id=${gameKey}`;
        let ws;
        try {
            ws = new WebSocket(socketUrl);
        } catch (err) {
            console.error("Ошибка создания WebSocket", err);
            return;
        }
        ws.onopen = () => {
            console.log("WS-соединение установлено");
            socketRef.current = ws;
        };
        ws.onmessage = (event) => {
            console.log("WS сообщение:", event.data);
            try {
                const trimmed = event.data.trim();
                if (!trimmed.startsWith("{")) {
                    console.log("Получено уведомление:", event.data);
                    return;
                }
                const data = JSON.parse(event.data);

                if (data.move) {
                    setIncomingMove(data.move);
                }
            } catch (err) {
                console.error("Ошибка обработки WS сообщения", err);
            }
        };
        ws.onerror = (err) => {
            console.error("WS ошибка", err);
        };
        ws.onclose = (event) => {
            console.warn("WS закрыт", event);
            socketRef.current = null;
            if (!unmountedRef.current) {
                setTimeout(() => {
                    connectSocket();
                }, 3000);
            }
        };
    }, [gameKey]);

    useEffect(() => {
        connectSocket();
        return () => {
            unmountedRef.current = true;
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectSocket]);

    const sendMove = useCallback(
        (message) => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify(message));
            } else {
                console.warn("WS-соединение не установлено для отправки хода");
            }
        },
        []
    );

    const handleLeave = async () => {
        try {
            await leaveGame(gameKey);
            navigate(`/`);
        } catch (error) {
            console.error("Ошибка выхода из игры", error);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <h2>Игра: {gameKey}</h2>
                <button onClick={handleLeave} className={styles.leaveButton}>
                    Выйти
                </button>
            </div>
            <GoPlayerMultiplayer
                onSendMove={sendMove}
                incomingMove={incomingMove}
                initialSgf={sgf}
            />
        </div>


    );
}

function Game() {
    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    );
}

export default Game;

```

#### /pages/Game/Game.module.css

```
.container {
    text-align: center;
}

.leaveButton {
    font-size: 16px;
    padding: 8px 16px;
    cursor: pointer;
    margin-bottom: 20px;
}
```

#### /pages/Home/Home.jsx

```
import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom"; // Импортируем Link

function Home() {
    return (
        // Добавляем класс для фона гобана ко всему main контенту
        <main className={`${styles.homePage} go-board-bg`}>
            <div className={styles.container}>
                {/* Hero section */}
                <section className={`${styles.heroSection} ${styles.brushBorder}`}>
                    {/* <div className={styles.inkSplash}></div> */} {/* Можно раскомментировать для эффекта чернил */}
                    <div className={styles.heroContent}>
                        <h1 className={styles.mainTitle}>Добро пожаловать в мир Го</h1>
                        <p className={styles.subtitle}>
                            Древняя игра стратегии, сочетающая простоту правил и безграничную глубину.
                            Здесь вы сможете сыграть партию с игроками со всего мира, улучшить своё мастерство
                            с помощью уроков и испытать себя против современных AI-ботов, вдохновлённых AlphaGo.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link to="/create">
                                <button className={`${styles.button} ${styles.primaryButton}`}>
                                    {/* Иконка (можно добавить SVG) */}
                                    Начать игру
                                </button>
                            </Link>
                             <Link to="/archive"> {/* Пример ссылки на Архив */}
                                <button className={`${styles.button} ${styles.secondaryButton}`}>
                                    {/* Иконка (можно добавить SVG) */}
                                    Архив игр
                                </button>
                             </Link>
                        </div>
                    </div>
                </section>

                 {/* Go stones decoration */}
                 <div className={styles.stonesDecoration}>
                     <div className={`${styles.stone} go-stone-black`}></div>
                     <div className={`${styles.stone} go-stone-white`}></div>
                     <div className={`${styles.stone} go-stone-black`}></div>
                     <div className={`${styles.stone} go-stone-white`}></div>
                     <div className={`${styles.stone} go-stone-black`}></div>
                 </div>

                 {/* Features section */}
                 <section className={styles.featuresSection}>
                     {/* Feature 1: Play with humans */}
                     <div className={styles.featureCard}>
                         <div className={styles.featureIcon}>
                            <div className={`${styles.iconStone} go-stone-black`}>
                                {/* Иконка людей SVG */}
                                <svg className={styles.svgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            </div>
                         </div>
                         <h3 className={styles.featureTitle}>Игра с людьми</h3>
                         <p>Сразитесь с игроками со всего мира. Находите соперников вашего уровня и совершенствуйте мастерство.</p>
                     </div>

                     {/* Feature 2: AI Bots */}
                     <div className={styles.featureCard}>
                         <div className={styles.featureIcon}>
                             <div className={`${styles.iconStone} go-stone-white`}>
                                 {/* Иконка AI SVG */}
                                 <svg className={styles.svgIconDark} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                             </div>
                         </div>
                         <h3 className={styles.featureTitle}>ИИ-боты</h3>
                         <p>Играйте против искусственного интеллекта разных уровней. Учитесь у алгоритмов, вдохновлённых AlphaGo.</p>
                     </div>

                     {/* Feature 3: Lessons & Analysis */}
                     <div className={styles.featureCard}>
                         <div className={styles.featureIcon}>
                             <div className={`${styles.iconStone} go-stone-black`}>
                                  {/* Иконка анализа SVG */}
                                 <svg className={styles.svgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                             </div>
                         </div>
                         <h3 className={styles.featureTitle}>Уроки и анализ</h3>
                         <p>Изучайте стратегии, решайте задачи и анализируйте свои партии с помощью мощных инструментов разбора.</p>
                     </div>
                 </section>

                {/* Chat section */}
                <section className={styles.chatSection}>
                    <div className={styles.chatHeader}>
                         {/* Иконка чата SVG */}
                        <svg className={styles.chatIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        <h2 className={styles.chatTitle}>Чат игроков</h2>
                    </div>
                    <iframe
                        src="http://176.99.133.223:8000/"
                        className={styles.chatIframe}
                        title="Chat"
                    />
                </section>
            </div>
        </main>
    );
}

export default Home;
```

#### /pages/Home/Home.module.css

```
/* Стили для всей страницы Home */
.homePage {
    padding: 2rem 0; /* Добавим отступы сверху/снизу для фона */
    min-height: calc(100vh - 64px); /* Занимаем высоту экрана минус хедер (примерно) */
}

/* Общий контейнер для контента */
.container {
    max-width: 1100px; /* Увеличим максимальную ширину */
    margin: 0 auto;
    padding: 0 1rem; /* Отступы по бокам */
}

/* Hero Section */
.heroSection {
    position: relative;
    background-color: rgba(255, 255, 255, 0.9); /* Полупрозрачный белый фон */
    padding: 3rem 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    margin-bottom: 3rem;
    overflow: hidden; /* Для эффекта кисти */
}

/* Эффект кисти (опционально, если SVG сложный) */
.brushBorder {
    border: 5px solid transparent; /* Прозрачная граница для позиционирования */
    /* Если нужен SVG бордюр, его можно добавить через ::before/::after */
    border-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M5,5 Q25,0 50,5 T95,5 Q100,25 95,50 T95,95 Q75,100 50,95 T5,95 Q0,75 5,50 T5,5" fill="none" stroke="%23a67c52" stroke-width="3"/></svg>') 5 stretch;
}

/* Эффект чернильной кляксы (опционально) */
.inkSplash {
    position: absolute;
    top: -20px;
    right: -30px;
    width: 200px;
    height: 200px;
    background-image: url('data:image/svg+xml;utf8,<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M100,50 C120,30 150,40 160,70 C170,100 150,130 120,140 C90,150 60,130 50,100 C40,70 60,40 80,30 C90,25 95,35 100,50 Z" fill="%233a3226" opacity="0.08"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.5;
    z-index: 0;
}

.heroContent {
    position: relative; /* Чтобы контент был над кляксой */
    z-index: 1;
}

.mainTitle {
    font-size: 2.8rem; /* Крупный заголовок */
    color: var(--color-primary-dark);
    margin-bottom: 1rem;
    font-family: var(--font-family-serif);
}

.subtitle {
    font-size: 1.1rem;
    color: var(--color-secondary);
    margin-bottom: 2rem;
    line-height: 1.7;
    max-width: 700px; /* Ограничим ширину подзаголовка */
}

.heroButtons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.button {
    /* Глобальные стили для кнопок уже в index.css */
    padding: 0.8em 1.5em;
    font-size: 1rem;
    display: inline-flex; /* Для иконок */
    align-items: center;
    gap: 0.5rem;
}

.primaryButton {
    background-color: var(--color-primary-dark);
    color: var(--color-text-on-dark);
}
.primaryButton:hover {
    background-color: var(--color-primary);
}

.secondaryButton {
    background-color: var(--color-secondary);
    color: var(--color-text-on-dark);
}
.secondaryButton:hover {
    background-color: #5a5246;
}

/* Декорация камнями */
.stonesDecoration {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    gap: 1.5rem;
}

.stone {
    width: 4rem; /* Размер декоративных камней */
    height: 4rem;
    border-radius: 50%; /* !!! ДОБАВЛЕНО СЮДА !!! */
    /* Стили go-stone-black/white применяются из index.css для фона */
    box-shadow: var(--shadow-md); /* Добавим тень */
}

/* Секция преимуществ */
.featuresSection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Адаптивная сетка */
    gap: 2rem;
    margin-bottom: 3rem;
}

.featureCard {
    background-color: rgba(255, 255, 255, 0.85);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    text-align: center;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    border: 1px solid var(--border-color);
}

.featureCard:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.featureIcon {
    margin-bottom: 1rem;
    display: inline-block; /* Чтобы обертка подстраивалась под камень */
}

.iconStone {
    width: 3.5rem; /* Размер камня-иконки */
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto; /* Центрирование */
    box-shadow: var(--shadow-sm);
}

.svgIcon {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-text-on-dark); /* Цвет иконки на черном камне */
}
.svgIconDark {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-text-on-light); /* Цвет иконки на белом камне */
}


.featureTitle {
    font-size: 1.4rem;
    color: var(--color-primary-dark);
    margin-bottom: 0.5rem;
    font-family: var(--font-family-serif);
}

.featureCard p {
    font-size: 0.95rem;
    color: var(--color-secondary);
    line-height: 1.6;
}

/* Секция чата */
.chatSection {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    overflow: hidden; /* Чтобы скруглить углы iframe */
    border: 1px solid var(--border-color);
}

.chatHeader {
    background-color: var(--color-primary-dark);
    color: var(--color-text-on-dark);
    padding: 0.8rem 1.5rem;
    display: flex;
    align-items: center;
}

.chatIcon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.8rem;
}

.chatTitle {
    font-size: 1.3rem;
    font-family: var(--font-family-serif);
    color: var(--color-text-on-dark); /* Убедимся, что цвет правильный */
    margin-bottom: 0; /* Убираем стандартный отступ заголовка */
}


.chatIframe {
    width: 100%;
    height: 500px;
    border: none;
    display: block; /* Убираем лишние отступы под iframe */
}

/* Адаптивность */
@media (max-width: 768px) {
    .mainTitle {
        font-size: 2.2rem;
    }
    .subtitle {
        font-size: 1rem;
    }
    .stone {
        width: 3rem;
        height: 3rem;
    }
    .featuresSection {
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
     .heroSection {
        padding: 2rem 1rem;
     }
     .mainTitle {
        font-size: 1.8rem;
     }
     .subtitle {
        font-size: 0.95rem;
     }
     .heroButtons {
         flex-direction: column; /* Кнопки друг под другом */
         align-items: center;
     }
     .button {
         width: 80%; /* Кнопки шире */
         justify-content: center;
     }
     .stonesDecoration {
        gap: 1rem;
        flex-wrap: wrap; /* Перенос камней */
     }
     .stone {
         width: 2.5rem;
         height: 2.5rem;
     }
     .featureCard {
         padding: 1rem;
     }
     .featureTitle {
         font-size: 1.2rem;
     }
}
```

#### /pages/JoinGame/JoinGame.jsx

```
import React, { useEffect, useState } from "react";
import { joinGame } from "../../services/API/gameApi";
import { useNavigate } from "react-router-dom";
import styles from "./JoinGame.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { GameProvider, useGame } from "../../contexts/GameContext";

function JoinGameContent() {
    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setPlayerColor } = useGame();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleJoin = async (e) => {
        e.preventDefault(); // Предотвращаем стандартную отправку формы
        if (!gameCode.trim()) {
            setError("Введите код игры.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await joinGame(gameCode);
            setPlayerColor("w"); // Присоединившийся играет за белых
            navigate(`/game/${gameCode}`);
        } catch (err) {
            console.error("Ошибка подключения к игре", err);
            setError(err.response?.data?.Body?.ErrorDescription || err.message || "Не удалось подключиться к игре. Проверьте код или попробуйте позже.");
            setIsLoading(false);
        }
         // Не нужно setIsLoading(false) при успехе, т.к. происходит редирект
    };

    return (
        <div className={`${styles.container} main-container`}> {/* Добавлен main-container */}
            <h2>Подключиться к игре</h2>
            <p className={styles.description}>
                Введите код игры, полученный от другого игрока, чтобы присоединиться.
                Вы будете играть за белых.
            </p>
            <form onSubmit={handleJoin} className={styles.joinForm}>
                <input
                    type="text"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    placeholder="Код игры"
                    className={styles.inputField}
                    required
                    disabled={isLoading}
                />
                <button type="submit" className={styles.joinButton} disabled={isLoading}>
                    {isLoading ? "Подключение..." : "Подключиться"}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

// Обертка с GameProvider остается, так как JoinGameContent использует useGame
function JoinGame() {
    return (
        <GameProvider>
            <JoinGameContent />
        </GameProvider>
    );
}

export default JoinGame;
```

#### /pages/JoinGame/JoinGame.module.css

```
.container {
    /* Использует .main-container из index.css */
   text-align: center;
   padding-top: 3rem;
   padding-bottom: 3rem;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1.5rem;
}

.container h2 {
   color: var(--color-primary-dark);
   margin-bottom: 0.5rem;
}

.description {
   color: var(--color-secondary);
   max-width: 500px;
   line-height: 1.6;
   margin-bottom: 1rem;
}

.joinForm {
   display: flex;
   flex-direction: column; /* Элементы формы друг под другом */
   align-items: center;
   gap: 1rem; /* Отступ между инпутом и кнопкой */
   width: 100%;
   max-width: 350px; /* Ограничиваем ширину формы */
}

.inputField {
   width: 100%; /* Растягиваем инпут */
   font-size: 1rem;
   padding: 0.8em; /* Увеличим паддинг */
   text-align: center; /* Центрируем текст в инпуте */
}

.joinButton {
   width: 100%; /* Кнопка на всю ширину формы */
   padding: 0.8em 1.5em;
   font-size: 1.1rem;
   background-color: var(--color-primary-dark);
   color: var(--color-text-on-dark);
}

.joinButton:hover {
   background-color: var(--color-primary);
}

.joinButton:disabled {
   background-color: #a0a0a0;
   cursor: not-allowed;
}

.error {
   color: var(--color-accent);
   font-weight: 500;
   margin-top: 1rem;
   padding: 0.8rem;
   background-color: rgba(192, 57, 43, 0.1);
   border: 1px solid var(--color-accent);
   border-radius: var(--border-radius);
   max-width: 500px;
   width: 100%; /* Занимает ширину контейнера */
   box-sizing: border-box; /* Учитываем padding и border */
}
```

#### /pages/Login/Login.jsx

```
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login as apiLogin } from "../../services/API/authApi";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: ({ username, password }) => apiLogin(username, password),
        onSuccess: (response, variables) => {
            const { Status, Body } = response.data;
            if (Status === 200) {
                login({ username: variables.username });
                navigate("/");
            } else {
                throw new Error(Body?.ErrorDescription || "Ошибка авторизации");
            }
        },
        onError: (error) => {
            console.error("Ошибка при авторизации", error);
        }
    });

    const handleLogin = (formData) => {
        mutate({
            username: formData.username,
            password: formData.password,
        });
    };

    return (
        <div>
            <AuthForm
                onSubmit={handleLogin}
                error={error?.message}
                isLoading={isLoading}
                formType="login"
            />
        </div>
    );
};

export default Login;

```

#### /pages/Offline/Offline.jsx

```
import GoPlayerOffline from "../../components/GoPlayers/GoPlayerOffline.jsx";

function Offline() {
    return (
        <div>
            <GoPlayerOffline width={865} height={865} options={{}}/>
        </div>
    );
}

export default Offline;

```

#### /pages/Offline/Offline.module.css

```

```

#### /pages/Register/Register.jsx

```
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { register as apiRegister } from "../../services/API/authApi";
import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const mutation = useMutation({
        mutationFn: ({ username, password, email }) =>
            apiRegister(username, password, email),
        onSuccess: (response, variables) => {
            // Проверяем и используем username из variables для логина
            const { Status, Body } = response.data;
            if (Status === 200) {
                login({ username: variables.username }); // Используем username из формы
                navigate("/");
            } else {
                throw new Error(Body?.ErrorDescription || "Ошибка регистрации");
            }
        },
        onError: (error) => {
            console.error("Ошибка при регистрации", error);
            // Ошибка будет отображена в RegisterForm благодаря `mutation.error?.message`
        }
    });

    const handleRegister = (formData) => {
        mutation.mutate({
            username: formData.username,
            password: formData.password,
            email: formData.email,
        });
    };

    return (
        // Добавляем класс main-container для общих стилей отступов и максимальной ширины
        <div className="main-container">
            <RegisterForm
                onSubmit={handleRegister}
                error={mutation.error?.message}
                isLoading={mutation.isLoading}
            />
        </div>
    );
};

export default Register;
```

#### /routes/AppRouter.jsx

```
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Offline from "../pages/Offline/Offline.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import JoinGame from "../pages/JoinGame/JoinGame.jsx";
import Game from "../pages/Game/Game.jsx";
import AI from "../pages/AI/AI.jsx";
import CreateGame from "../pages/CreateGame/CreateGame.jsx";
import ArchivePage from "../pages/Archive/Archive.jsx";
import ArchiveGame from "../pages/ArchiveGame/ArchiveGame.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/offline" element={<Offline/>}/>
            <Route path="/join" element={<JoinGame />} />
            <Route path="/create" element={<CreateGame />} />
            <Route path="/game/:gameKey" element={<Game />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/archive/game/:gameId" element={<ArchiveGame />} />
            <Route path="*" element={<div>Страница не найдена</div>}/>
        </Routes>
    );
}

```

#### /services/api.js

```
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 5000,
    withCredentials: true,
});

export default api;

```

#### /services/API/aiApi.js

```
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
```

#### /services/API/archiveApi.js

```
import api from "../api";

/**
 * Массив имен из архива
 * @param page
 */
export function getNamesInArchive(page) {
    return api.get(`/getNamesInArchive?page=${page}`)
}

/**
 * Массив лет из архива
 */
export function getYearsInArchive() {
    return api.get(`/getYearsInArchive`)
}

/**
 * Возвращает архив игр с постраничной разбивкой,
 * с возможностью фильтрации по году или имени игрока.
 * Обязательно необходимо указать хотя бы один из параметров: год (year) или имя (name).
 * @param year
 * @param name
 * @param page
 */
export function getArchive(year, name, page) {
    return api.get(`/getArchive?year=${year}&name=${name}&page=${page}`)
}


/**
 * Получение информации об игре из архива
 * @param {string} gameId – идентификатор игры
 */
export function getGameFromArchiveById(gameId) {
    return api.post(`/getGameFromArchiveById`, {game_id: gameId});
}

```

#### /services/API/authApi.js

```
import api from "../api";

/**
 * Логин
 * @param username
 * @param password
 */
export function login(username, password) {
    return api.post("/login", {
        Username: username,
        Password: password,
    })
}

/**
 * Выход из аккаунта
 */
export function logout() {
    return api.delete("/logout");
}

/**
 * Регистрация
 * @param username
 * @param password
 * @param email
 */
export function register(username, password, email) {
    return api.post("/register", {
        Username: username,
        Password: password,
        Email: email,
    })
}
```

#### /services/API/gameApi.js

```
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
export function getGameInfo(gameCode) {
    return api.post("/getGameByPublicKey", {
        game_key: gameCode,
    });
}

/**
 * Выход из игры
 * @param gameCode
 */
export function leaveGame(gameCode) {
    return api.post("/leaveGame", {
        public_key: gameCode,
    });
}
```

#### /utils/conversionUtils.js

```
export const convertCoords = (x, y, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = letters[x] || "";
    const number = boardSize - y;
    return letter + number;
};

export const parseCoords = (moveStr, boardSize) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = moveStr[0];
    const num = parseInt(moveStr.slice(1), 10);
    const x = letters.indexOf(letter);
    const y = boardSize - num;
    return { x, y };
};

export const extractMoves = (sgf, boardSize) => {
    const moves = [];
    const regex = /;([BW])\[([a-z]{2})\]/gi;
    let match;
    while ((match = regex.exec(sgf)) !== null) {
        const colorChar = match[1];
        const coord = match[2];
        const x = coord.charCodeAt(0) - "a".charCodeAt(0);
        const y = coord.charCodeAt(1) - "a".charCodeAt(0);
        const coordinates = convertCoords(x, y, boardSize);
        const color = colorChar.toLowerCase();
        moves.push({ color, coordinates });
    }
    return moves;
};

const coordToSgf = (coord) => {
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = coord[0].toUpperCase();
    const number = parseInt(coord.slice(1), 10);

    const x = letters.indexOf(letter);
    const y = 19 - number;
    if (x < 0 || y < 0 || x >= 19 || y >= 19) return "";

    const sgfX = String.fromCharCode("a".charCodeAt(0) + x);
    const sgfY = String.fromCharCode("a".charCodeAt(0) + y);
    return sgfX + sgfY;
};

export const fixSgfFormat = (sgfRaw) => {
    return sgfRaw.replace(/;(black|white)\[([A-T]\d{1,2})\]/gi, (_, color, coord) => {
        const sgfCoord = coordToSgf(coord);
        const sgfColor = color.toLowerCase() === "black" ? "B" : "W";
        return `;${sgfColor}[${sgfCoord}]`;
    });
};

```

#### /utils/useResponsiveBoardSize.js

```
import {useState, useEffect} from "react";

export function useResponsiveBoardSize(margin = 20) {
    const [boardSize, setBoardSize] = useState(
        Math.min(window.innerWidth, window.innerHeight) - margin
    );

    useEffect(() => {
        const updateSize = () => {
            const newSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9) - margin;
            setBoardSize(newSize);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [margin]);

    return boardSize;
}

```

