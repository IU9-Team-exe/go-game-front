// src/components/header/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";

function Header() {
    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>
                <Typography variant="h6" component="div" className={styles.title}>
                    Go Game
                </Typography>
                <Button color="inherit" className={styles.button}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
