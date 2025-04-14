// src/pages/Offline/Offline.jsx
import React, { useEffect, useRef } from 'react';
import GoPlayerOffline from "../../components/GoPlayers/GoPlayerOffline.jsx";
import styles from './Offline.module.css'; // Создайте, если нужны доп. стили

function Offline() {
    const playerContainerRef = useRef(null);

    // Проинициализируйте плеер с нужными опциями здесь, если нужно
    // Например, чтобы включить координаты

    return (
        // Используем обертку для центрирования и стилизации, если нужно
        <div className={styles.offlineContainer}>
             {/* GoPlayerOffline создаст внутри себя .wgo-player-main */}
            <GoPlayerOffline />
        </div>
    );
}

export default Offline;