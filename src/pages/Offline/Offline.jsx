import React from "react";
import GoPlayerOffline from "../../components/GoPlayers/GoPlayerOffline.jsx";
import styles from "./Offline.module.css";

function Offline() {
    return (
        <div className={styles.offlineContainer}>
            <h1 className={styles.offlineTitle}>Режим игры оффлайн</h1>
            <p className={styles.offlineDescription}>
                Играйте в Го локально против друга или изучайте партии.
            </p>
            <div className={styles.goPlayerWrapper}>
                <GoPlayerOffline width={865} height={865} options={{}} />
            </div>
        </div>
    );
}

export default Offline;
