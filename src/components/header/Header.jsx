import React from "react";
import { Link, NavLink } from "react-router-dom"; // Используем NavLink для activeClassName
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { logout as apiLogout } from "../../services/API/authApi";

// Иконка камня Го (простая)
const GoStoneIcon = () => (
    <div className={styles.goStoneIconContainer}>
        <div className={styles.goStoneIconOuter}>
            <div className={styles.goStoneIconInner}></div>
        </div>
    </div>
);

const Header = () => {
    const { user, logout: contextLogout } = useAuth();

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        } finally {
            contextLogout();
        }
    };

    return (
        // Используем AppBar от MUI, но стилизуем его через CSS модуль
        <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logoLink}>
                        <GoStoneIcon />
                        <Typography variant="h6" component="div" className={styles.title}>
                            囲碁 {/* Go по-японски */}
                        </Typography>
                    </Link>
                    <nav className={styles.navigation}>
                        <NavLink to="/offline" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Offline
                        </NavLink>
                        <NavLink to="/create" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Создать
                        </NavLink>
                        <NavLink to="/join" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Войти
                        </NavLink>
                        <NavLink to="/ai" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Играть с AI
                        </NavLink>
                        <NavLink to="/archive" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
                            Архив
                        </NavLink>
                    </nav>
                </div>
                <div className={styles.right}>
                    {user ? (
                        <>
                            <Typography variant="subtitle1" className={styles.nickname}>
                                {user.username} {/* Отображаем username */}
                            </Typography>
                            {/* Используем стилизованную кнопку */}
                            <button onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`}>
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Используем стилизованные кнопки вместо Link */}
                            <Link to="/login">
                                <button className={`${styles.button} ${styles.loginButton}`}>
                                    Войти
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className={`${styles.button} ${styles.registerButton}`}>
                                    Регистрация
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;