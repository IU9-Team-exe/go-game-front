import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const AuthForm = ({ onSubmit, error, isLoading }) => {
  // Данные для формы
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Массив ссылок на видео
  const videos = [
  "/video1.mp4",
  "/video2.mp4",
  "/video3.mp4",
  "/video4.mp4"
];
  // Состояние для отслеживания текущего видео
  const [currentVideo, setCurrentVideo] = useState(0);

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  // Обработчик события завершения видео
  const handleVideoEnd = () => {
    setCurrentVideo((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className={styles.background}>
      {/* Видео на заднем плане */}
      <video
        key={videos[currentVideo]}
        className={styles.videoBackground}
        src={videos[currentVideo]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
      {/* Форма авторизации */}
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Авторизация</h2>
        <label>
          Имя пользователя:
          <input
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
