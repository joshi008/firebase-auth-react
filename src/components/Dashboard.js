import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import firebaseConfig from "../config"
import firebase from "firebase/app";
import "firebase/database";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
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


function Dashboard(props) {
    const classes = useStyles();
    const [dob, setDob] = useState("");
    let gdob = "";
    const database = firebase.database();


    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Redirect to="/"></Redirect>;
    }
    else {
        // console.log("Hello")
        // console.log(currentUser.uid);
        database.ref("users/" + currentUser.uid).get().then(function (snapshot) {
            if (snapshot.exists()) {

                gdob = snapshot.val().dob;
                // console.log(gdob)
                setDob(gdob);
                // console.log(snapshot.val());
                // console.log(typeof gdob);
            }
            else {
                console.log("No data available");
            }
        }).catch(function (error) {
            console.error(error);
        })
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <EmojiPeopleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Dashboard
                    </Typography>
                    <h1>Welcome!!!</h1>



                    <Typography variant="h5" component="h5">
                        Your DOB is : {dob}
                    </Typography>

                    <br />

                    <Button variant="contained" color="primary" onClick={() => firebaseConfig.auth().signOut()}>
                        Sign out
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default Dashboard;
