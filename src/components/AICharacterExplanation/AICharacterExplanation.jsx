import React from 'react';
import styles from './AICharacterExplanation.module.css';

// Компонент для картинки
const CharacterImage = ({ type }) => {
    let imageSrc = '/images/chill-guy.png'; // Путь по умолчанию (относительно папки public)
    if (type === 'animeGirl') {
        imageSrc = '/images/anime-girl.png'; // Путь к другой картинке
    }

    // Используем <img> вместо <div>
    return (
        <img
            src={imageSrc}
            alt={type === 'animeGirl' ? "Anime девушка" : "Chill guy"} // Альтернативный текст
            className={styles.characterImage} // Используем CSS класс для стилей
        />
    );
};

const AICharacterExplanation = ({ explanation, error, characterType = 'chillGuy', onClose }) => {
    const message = error || explanation || '...';

    return (
        // Добавляем класс для анимации появления
        <div className={`${styles.overlay} ${styles.overlayEnter}`} onClick={onClose}>
            <div className={styles.characterContainer} onClick={(e) => e.stopPropagation()}>
                <CharacterImage type={characterType} />
                 {/* Добавляем класс для анимации появления */}
                <div className={`${styles.speechBubble} ${styles.speechBubbleEnter}`}>
                    <p className={error ? styles.errorText : styles.explanationText}>
                        {message}
                    </p>
                    <button onClick={onClose} className={styles.closeButtonBubble}>✕</button>
                </div>
            </div>
        </div>
    );
};

export default AICharacterExplanation;