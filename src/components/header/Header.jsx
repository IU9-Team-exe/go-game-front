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
                <div className={styles.left}>
                    <Typography variant="h6" component="div" className={styles.title}>
                        <Link to="/" className={styles.link}>
                            Go Game
                        </Link>
                    </Typography>

                    <Button color="inherit">
                        <Link to="/offline" className={styles.link}>
                            Offline
                        </Link>
                    </Button>

                    <Button color="inherit">
                        <Link to="/game" className={styles.link}>
                            Create
                        </Link>
                    </Button>

                    <Button color="inherit">
                        <Link to="/join" className={styles.link}>
                            Join
                        </Link>
                    </Button>

                    <Button color="inherit">
                        <Link to="/ai" className={styles.link}>
                            AI
                        </Link>
                    </Button>
                </div>

                <div className={styles.right}>
                    <Button color="inherit">
                        <Link to="/login" className={styles.link}>
                            Login
                        </Link>
                    </Button>

                    <Button color="inherit">
                        <Link to="/register" className={styles.link}>
                            Register
                        </Link>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
