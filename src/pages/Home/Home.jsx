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