есть следующий код, доработай в нём дизайн. Опирайся на восточные тематики (КНР, Япония, Китай, Корея) и используй тематику ГО (вейци, бадук)
Доработай основную корневую страницу, которая встречает первых пользоавтелей. В дизайне вдохновляйся игрой го, гобаном (доска для игры го), камнями (фишки для игры го), азиатским искусством (китайская живопись и т.п.), также можешь использовать современную парадигму го, связь с AI (AlphaGo, KataGo etc.), в любом случае используй те или иные формы доски для го (гобана) и камней 

---

src/pages/Home/Home.jsx
```jsx
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
```
src/pages/Home/Home.module.css
```css
.home-container {
    padding: 2rem;
    margin: 0 auto;
    max-width: 800px;
}

/* Отступы для абзацев */
.home-container p {
    margin-bottom: 1rem;
}

/* Небольшой отступ для заголовка */
.home-container h1 {
    margin-bottom: 1.5rem;
}
```
src/index.css
```css
:root {
  /* Шрифты */
  --font-family-base: system-ui, Avenir, Helvetica, Arial, sans-serif;
  --font-size-base: 16px;
  --font-weight-normal: 400;
  --font-weight-bold: 700;

  /* Цвета для светлой темы */
  --color-primary: #646cff;
  --color-primary-hover: #535bf2;
  --color-secondary: #213547;
  --color-background: #ffffff;
  --color-text: rgba(0, 0, 0, 0.87);
}

/* Глобальные стили для документа */
body {
  font-family: var(--font-family-base), serif;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-background);
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

/* Заголовки */
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

/* Стилизация ссылок */
a {
  font-weight: 500;
  color: var(--color-primary);
  text-decoration: none;
}
a:hover {
  color: var(--color-primary-hover);
}

/* Универсальные стили для кнопок */
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  background-color: var(--color-secondary);
  color: var(--color-background);
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: var(--color-primary);
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

/* Поддержка тёмной темы */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #242424;
    --color-text: rgba(255, 255, 255, 0.87);
  }
}
```
src/components/header/Header.module.css
```css
/* Стили для Toolbar */
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}

.left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Стили для заголовка */
.title {
    font-weight: bold;
}

/* Стили для ссылок */
.link {
    color: inherit;
    text-decoration: none;
}

.link:hover,
.link:focus,
.link:visited,
.link:active {
    text-decoration: none;
    color: inherit;
}
```