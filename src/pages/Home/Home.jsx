import React from "react";
import "./Home.module.css";

function Home() {
    return (
        <div className="home-container">
            <h1>Добро пожаловать в Go Game!</h1>
            <p>
                Здесь вы можете сыграть партию в го с другими игроками,
                ознакомиться с учебными материалами и улучшить своё мастерство.
            </p>
            <p>
                Выберите нужный раздел в меню (например, «Игра» или «Обучение»),
                чтобы приступить к изучению или сыграть партию.
            </p>
        </div>
    );
}

export default Home;
