import React from "react";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles["home-container"]}>
            <h1>Добро пожаловать в Go Game!</h1>
            <p>
                Здесь вы можете сыграть партию в го с другими игроками,
                ознакомиться с учебными материалами и улучшить своё мастерство. А также ниже можно пообщаться в чате :)
            </p>
            <iframe
                src="http://176.99.133.223:8000/"
                style={{ width: "100%", height: "600px", border: "none" }}
                title="Chat"
            />
        </div>
    );
}

export default Home;
