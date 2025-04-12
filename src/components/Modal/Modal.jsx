import React from "react";
import styles from "./Modal.module.css";

// Simple SVG for the 'chill guy' placeholder
const ChillGuyIcon = () => (
    <svg
        className={styles.chillGuyIcon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Simple face elements */}
        <circle cx="50" cy="50" r="45" stroke="var(--color-secondary)" strokeWidth="3" />
        <circle cx="35" cy="40" r="5" fill="var(--color-secondary)" />
        <circle cx="65" cy="40" r="5" fill="var(--color-secondary)" />
        {/* Chill smile */}
        <path
            d="M 30 65 Q 50 80 70 65"
            stroke="var(--color-secondary)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />
        {/* Sunglasses (optional cool touch) */}
        <rect x="25" y="32" width="50" height="15" rx="5" fill="var(--color-stone-black)" opacity="0.8"/>
        <line x1="25" y1="39.5" x2="15" y2="45" stroke="var(--color-stone-black)" strokeWidth="2"/>
        <line x1="75" y1="39.5" x2="85" y2="45" stroke="var(--color-stone-black)" strokeWidth="2"/>
    </svg>
);


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    × {/* Simple close icon */}
                </button>
                <div className={styles.modalHeader}>
                    <ChillGuyIcon />
                    <h3 className={styles.modalTitle}>AI Sensei says...</h3>
                </div>
                <div className={styles.modalBody}>{children}</div>
                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={styles.okButton}>
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;