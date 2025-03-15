import React from "react";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";


function Header() {
    return (
        <AppBar position="static">
            <Toolbar className={styles.toolbar}>
                <Typography variant="h6" component="div" className={styles.title}>
                    <Link to="/" className={styles.link}>
                        Go Game
                    </Link>
                </Typography>

                <Button color="inherit">
                    <Link to="/offline" className={styles.link}>
                        offline
                    </Link>
                </Button>

                <Button color="inherit">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
