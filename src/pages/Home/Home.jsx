import React from "react";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles["home-container"]}>
            <h1>Добро пожаловать в Go Game!</h1>
            <p>
                Здесь вы можете сыграть партию в го с другими игроками,
                ознакомиться с учебными материалами и улучшить своё мастерство.
            </p>
        </div>
    );
}

export default Home;
