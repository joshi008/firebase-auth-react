import React, { useContext, useState } from 'react'
import firebaseConfig from '../config'
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
}));


function Login() {
    const classes = useStyles();
    const [log, setLog] = useState("");
    let dob = "";

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements[0];
        const password = e.target.elements[2];

        firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value)
            .then((userCred) => {

            })
            .catch((e) => {
                console.log(e.message);
                setLog("Credentials are not correct. Please check it again.");
            })

    }


    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div>
            {/* <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form> */}

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
        </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
          </Button>
                        <Grid container>

                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

                <p className="log" id="log">{log}</p>
            </Container>


        </div>
    )
}

export default Login
