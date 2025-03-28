import React from "react";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import {useAuth} from "../../contexts/AuthContext";
import {logout as apiLogout} from "../../services/API/authApi";

const Header = () => {
    const {user, logout: contextLogout} = useAuth();

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
        <AppBar position="static">
            <Toolbar className={styles.toolbar}>
                <div className={styles.left}>
                    <Typography variant="h6" component="div" className={styles.title}>
                        <Link to="/" className={styles.link}>
                            Go Game
                        </Link>
                    </Typography>
                    <Link to="/offline" className={styles.link}>
                        Offline
                    </Link>
                    <Link to="/create" className={styles.link}>
                        Create
                    </Link>
                    <Link to="/join" className={styles.link}>
                        Join
                    </Link>
                    <Link to="/ai" className={styles.link}>
                        AI
                    </Link>
                </div>
                <div className={styles.right}>
                    {user ? (
                        <>
                            <Typography variant="subtitle1" className={styles.link}>
                                {user.nickname}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.link}>
                                Login
                            </Link>
                            <Link to="/register" className={styles.link}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
