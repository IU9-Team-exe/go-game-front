import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css";
import {useAuth} from "../../contexts/AuthContext";
import {logout as apiLogout} from "../../services/API/authApi";

const GoStoneIcon = () => (
    <div className={styles.goStoneIconContainer}>
        <div className={styles.goStoneIconOuter}>
            <div className={styles.goStoneIconInner}></div>
        </div>
    </div>
);

const navLinks = [
    {to: "/offline", label: "Offline"},
    {to: "/create", label: "Создать"},
    {to: "/join", label: "Присоединиться"},
    {to: "/ai", label: "Играть с AI"},
    {to: "/tasks/levels", label: "Уровни задач"},
    {to: "/archive", label: "Архив"},
];

const Header = () => {
    const {user, logout: contextLogout} = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        } finally {
            contextLogout();
            setMobileOpen(false);
        }
    };

    const toggleDrawer = () => {
        setMobileOpen(open => !open);
    };

    const drawerContent = (
        <div className={styles.drawer}>
            <List>
                {navLinks.map(({to, label}) => (
                    <ListItem key={to} disablePadding>
                        <ListItemButton component={NavLink} to={to} onClick={toggleDrawer}>
                            {label}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="static" className={styles.appBar}>
                <Toolbar className={styles.toolbar}>
                    <div className={styles.left}>
                        <IconButton
                            edge="start"
                            onClick={toggleDrawer}
                            aria-label="открыть меню"
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Link to="/" className={styles.logoLink}>
                            <GoStoneIcon/>
                            <Typography variant="h6" component="div" className={styles.title}>
                                囲碁
                            </Typography>
                        </Link>
                        <Box
                            component="nav"
                            className={styles.navigation}
                            sx={{
                                display: {xs: "none", md: "flex"},
                                flexShrink: 0
                            }}
                        >
                            {navLinks.map(({to, label}) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({isActive}) =>
                                        isActive
                                            ? `${styles.link} ${styles.activeLink}`
                                            : styles.link
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </Box>
                    </div>
                    <div className={styles.right}>
                        {user ? (
                            <>
                                <NavLink to="/profile" className={styles.link}>
                                    <Typography variant="subtitle1" className={styles.nickname}>
                                        {user.username}
                                    </Typography>
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className={`${styles.button} ${styles.logoutButton}`}
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button
                                        className={`${styles.button} ${styles.loginButton}`}
                                    >
                                        Войти
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button
                                        className={`${styles.button} ${styles.registerButton}`}
                                    >
                                        Регистрация
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="top"
                open={mobileOpen}
                onClose={toggleDrawer}
                ModalProps={{keepMounted: true}} // оптимизация для iOS
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Header;
