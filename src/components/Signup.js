import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";
import { AuthContext } from "../AuthContext";
import firebase from "firebase/app";
import "firebase/database";

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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



function Signup() {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [user, setUser] = useState(null);
    const [log, setLog] = useState("");
    const { currentUser } = useContext(AuthContext);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (e) => {
        setLog("");
        e.preventDefault();
        let database = firebase.database();

        console.log(e.target.elements);
        const email = e.target.elements[0];
        const password = e.target.elements[2];
        const dob = e.target.elements[4];


        firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCred) => {
                console.log(userCred)
                setUser(true);
                database.ref('users/' + userCred.user.uid).set({
                    email: email.value,
                    dob: dob.value,
                });
            })
            .catch((e) => {
                console.log(e.message);
                setLog(e.message);
            })
            .finally(() => {
                console.log("Success!!!!");
                return <Redirect to="/dashboard" />;
            })
    };

    const classes = useStyles();

    // if (user != null || currentUser != null) {
    //     return <Redirect to="/dashboard" />;
    // }


    if (user != null || currentUser != null) {
        return <Redirect to="/dashboard" />;
    }



    return (
        <div>
            {/* <h1>Signup</h1> */}

            {/* <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" />
                <br></br>
                <input type="password" name="password" placeholder="Password" />
                <br></br>
                <input type="date" name="dob" placeholder="Date of Birth" />
                <button type="submit">Submit</button>
            </form> */}





            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
        </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date of Birth"
                                        name="dob"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
          </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
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

export default Signup;
