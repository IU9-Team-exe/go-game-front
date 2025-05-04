import React, { useEffect, useRef, useState } from "react";
import { useResponsiveBoardSize } from "../../utils/useResponsiveBoardSize.js";
import "./GoPlayer.css";

const defaultSgf = "(;FF[4]GM[1]SZ[19])";

const GoPlayerOffline = ({ sgf = defaultSgf, options = {} }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const boardSize = useResponsiveBoardSize(20);
    const [chatMessage, setChatMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [timeSettings, setTimeSettings] = useState({
        blackTime: 600, // 10 минут в секундах
        whiteTime: 600,
        byoyomi: 30, // 30 секунд на ход в бёёми
        periods: 3 // количество периодов бёёми
    });
    const [activeMarker, setActiveMarker] = useState("letter"); // "letter", "number", "triangle", "square", "circle"
    const [markersEnabled, setMarkersEnabled] = useState(false);

    useEffect(() => {
        if (window.WGo && window.WGo.Player) {
            const playerOptions = { 
                width: boardSize, 
                height: boardSize, 
                sgf,
                layout: "right", // Располагаем панель управления и информации справа
                enableWheel: false, // Отключаем колесико мыши
                // Добавляем поддержку комментариев
                showComments: true,
                // Улучшенный дизайн
                theme: {
                    grid: {
                        borderWidth: 2,
                        lineWidth: 1,
                        starRadius: 3
                    },
                    stones: {
                        shadow: 0.5
                    }
                },
                ...options 
            };
            
            const player = new window.WGo.BasicPlayer(containerRef.current, playerOptions);
            player.setCoordinates(true);
            const editable = new window.WGo.Player.Editable(player, player.board);
            editable.set(true);
            
            // Улучшенный обработчик подсказок и уведомлений
            player.notifier = {
                showMessage: function(text) {
                    const notification = document.createElement("div");
                    notification.className = "wgo-notification";
                    notification.innerHTML = text;
                    containerRef.current.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.opacity = "0";
                        setTimeout(() => notification.remove(), 300);
                    }, 2000);
                }
            };
            
            // Настраиваем маркеры
            setupMarkers(player);
            
            playerRef.current = player;
        }
    }, [boardSize, sgf, options]);

    // Настройка маркеров при клике на доску
    const setupMarkers = (player) => {
        if (!player || !player.board) return;
        
        let letterIndex = 0;
        let numberIndex = 1;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        const originalClickHandler = player.board.click;
        
        player.board.click = function(x, y) {
            if (markersEnabled) {
                const c = {x: x, y: y};
                
                if (activeMarker === "letter") {
                    player.board.removeObject({type: "LB", text: alphabet[letterIndex]});
                    player.board.addObject({
                        type: "LB",
                        text: alphabet[letterIndex],
                        x: x,
                        y: y
                    });
                    letterIndex = (letterIndex + 1) % alphabet.length;
                } 
                else if (activeMarker === "number") {
                    player.board.addObject({
                        type: "LB",
                        text: numberIndex.toString(),
                        x: x,
                        y: y
                    });
                    numberIndex++;
                }
                else if (activeMarker === "triangle") {
                    player.board.addObject({
                        type: "TR",
                        x: x,
                        y: y
                    });
                }
                else if (activeMarker === "square") {
                    player.board.addObject({
                        type: "SQ",
                        x: x,
                        y: y
                    });
                }
                else if (activeMarker === "circle") {
                    player.board.addObject({
                        type: "CR",
                        x: x,
                        y: y
                    });
                }
                return true;
            }
            
            // Если маркеры не активны, используем стандартный обработчик
            return originalClickHandler.call(player.board, x, y);
        };
    };

    // Очистка разметки доски
    const clearAllMarkers = () => {
        if (playerRef.current && playerRef.current.board) {
            playerRef.current.board.removeAllObjects();
            playerRef.current.redraw();
        }
    };

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

    const handleSendComment = (e) => {
        e.preventDefault();
        if (chatMessage.trim()) {
            const newComment = {
                id: Date.now(),
                text: chatMessage,
                author: "Вы",
                timestamp: new Date().toLocaleTimeString()
            };
            setComments(prev => [...prev, newComment]);
            setChatMessage("");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    // Навигация по ходам
    const moveNavigation = (direction) => {
        if (!playerRef.current) return;
        
        switch (direction) {
            case 'first':
                playerRef.current.first();
                break;
            case 'prev':
                playerRef.current.previous();
                break;
            case 'next':
                playerRef.current.next();
                break;
            case 'last':
                playerRef.current.last();
                break;
            default:
                break;
        }
    };

    // Переключение маркера
    const toggleMarkerType = (markerType) => {
        setActiveMarker(markerType);
        if (!markersEnabled) {
            setMarkersEnabled(true);
        }
    };

    // Переключение режима маркеров
    const toggleMarkersMode = () => {
        setMarkersEnabled(!markersEnabled);
    };

    return (
        <div className="go-player-container">
            <div className="go-main-area">
                <div 
                    ref={containerRef}
                    className="go-board-container"
                    style={{ width: boardSize, height: boardSize, overflow: "hidden" }}
                />
                
                {/* Блок управления разметкой доски */}
                <div className="go-markup-controls">
                    <div className="go-markup-title">
                        Разметка доски
                        <div className="go-markup-switch">
                            <input 
                                type="checkbox" 
                                id="markup-switch" 
                                checked={markersEnabled} 
                                onChange={toggleMarkersMode} 
                            />
                            <label htmlFor="markup-switch">
                                {markersEnabled ? "Включено" : "Выключено"}
                            </label>
                        </div>
                    </div>
                    <div className="go-markup-buttons">
                        <button 
                            className={`go-markup-btn ${activeMarker === 'letter' && markersEnabled ? 'active' : ''}`} 
                            onClick={() => toggleMarkerType('letter')}
                            title="Буквы (A, B, C...)"
                        >
                            A-Z
                        </button>
                        <button 
                            className={`go-markup-btn ${activeMarker === 'number' && markersEnabled ? 'active' : ''}`} 
                            onClick={() => toggleMarkerType('number')}
                            title="Числа (1, 2, 3...)"
                        >
                            123
                        </button>
                        <button 
                            className={`go-markup-btn ${activeMarker === 'triangle' && markersEnabled ? 'active' : ''}`} 
                            onClick={() => toggleMarkerType('triangle')}
                            title="Треугольник"
                        >
                            △
                        </button>
                        <button 
                            className={`go-markup-btn ${activeMarker === 'square' && markersEnabled ? 'active' : ''}`} 
                            onClick={() => toggleMarkerType('square')}
                            title="Квадрат"
                        >
                            □
                        </button>
                        <button 
                            className={`go-markup-btn ${activeMarker === 'circle' && markersEnabled ? 'active' : ''}`} 
                            onClick={() => toggleMarkerType('circle')}
                            title="Круг"
                        >
                            ○
                        </button>
                        <button 
                            className="go-markup-btn go-markup-clear" 
                            onClick={clearAllMarkers}
                            title="Очистить все метки"
                        >
                            Очистить
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="go-side-panel">
                {/* Блок с таймером и настройками времени */}
                <div className="go-time-controls">
                    <div className="go-time-setting">
                        <div className="go-time-label">Время на партию:</div>
                        <div className="go-time-inputs">
                            <select 
                                value={timeSettings.blackTime} 
                                onChange={(e) => setTimeSettings({...timeSettings, blackTime: parseInt(e.target.value), whiteTime: parseInt(e.target.value)})}
                            >
                                <option value="300">5 минут</option>
                                <option value="600">10 минут</option>
                                <option value="900">15 минут</option>
                                <option value="1800">30 минут</option>
                                <option value="3600">1 час</option>
                            </select>
                        </div>
                    </div>
                    <div className="go-time-setting">
                        <div className="go-time-label">Бёёми:</div>
                        <div className="go-time-inputs">
                            <select 
                                value={timeSettings.byoyomi} 
                                onChange={(e) => setTimeSettings({...timeSettings, byoyomi: parseInt(e.target.value)})}
                            >
                                <option value="15">15 секунд</option>
                                <option value="30">30 секунд</option>
                                <option value="60">1 минута</option>
                            </select>
                            <span className="go-time-separator">x</span>
                            <select 
                                value={timeSettings.periods} 
                                onChange={(e) => setTimeSettings({...timeSettings, periods: parseInt(e.target.value)})}
                            >
                                <option value="1">1 период</option>
                                <option value="3">3 периода</option>
                                <option value="5">5 периодов</option>
                            </select>
                        </div>
                    </div>
                    <div className="go-time-display">
                        <div className="go-time-black">
                            <span className="go-stone go-stone-black"></span>
                            <span className="go-time-value">{formatTime(timeSettings.blackTime)}</span>
                        </div>
                        <div className="go-time-white">
                            <span className="go-stone go-stone-white"></span>
                            <span className="go-time-value">{formatTime(timeSettings.whiteTime)}</span>
                        </div>
                    </div>
                    
                    {/* Навигационные стрелки */}
                    <div className="go-navigation-controls">
                        <button 
                            className="go-nav-btn" 
                            onClick={() => moveNavigation('first')}
                            title="К началу"
                        >
                            ⏮
                        </button>
                        <button 
                            className="go-nav-btn" 
                            onClick={() => moveNavigation('prev')}
                            title="Предыдущий ход"
                        >
                            ◀
                        </button>
                        <button 
                            className="go-nav-btn" 
                            onClick={() => moveNavigation('next')}
                            title="Следующий ход"
                        >
                            ▶
                        </button>
                        <button 
                            className="go-nav-btn" 
                            onClick={() => moveNavigation('last')}
                            title="К концу"
                        >
                            ⏭
                        </button>
                    </div>
                </div>
                
                {/* Блок с чатом/комментариями (перемещен под время) */}
                <div className="go-chat-container">
                    <div className="go-chat-title">Комментарии</div>
                    <div className="go-chat-messages">
                        {comments.map(comment => (
                            <div key={comment.id} className="go-chat-message">
                                <span className="go-chat-author">{comment.author}</span>
                                <span className="go-chat-timestamp">{comment.timestamp}</span>
                                <div className="go-chat-text">{comment.text}</div>
                            </div>
                        ))}
                        {comments.length === 0 && (
                            <div className="go-chat-empty">Нет комментариев</div>
                        )}
                    </div>
                    <form className="go-chat-form" onSubmit={handleSendComment}>
                        <input 
                            type="text" 
                            className="go-chat-input" 
                            placeholder="Введите комментарий..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <button type="submit" className="go-chat-send">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GoPlayerOffline;
