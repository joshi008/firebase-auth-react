import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    links: {
        backgroundColor: "#303F9F",
        color: "white",
        padding: "1em 2em",
        textDecoration: "none",
        textTransform: "uppercase",
        borderRadius: "5px"
    }
}));


function Home() {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <HomeIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Home
                    </Typography>

                    <br />

                    {currentUser ? (
                        <Link to="/dashboard" className={classes.links}>Dashboard</Link>
                    ) : (
                            <p></p>
                        )}
                    <br></br>
                    <Link to="/login" className={classes.links}>Login</Link>
                    <br></br>
                    <Link to="/signup" className={classes.links}>Signup</Link>
                </div>
            </Container>

        </div>
    )
}

export default Home
