import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";
import { AuthContext } from "../AuthContext";
import firebase from "firebase/app";
import "firebase/database";

function Signup() {
    const [user, setUser] = useState(null);
    const [log, setLog] = useState("");
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        let database = firebase.database();


        const email = e.target.elements[0];
        const password = e.target.elements[1];
        const dob = e.target.elements[2];


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
    };



    if (user != null || currentUser != null) {
        setTimeout(function () { return <Redirect to="/dashboard" />; }, 1000);

    }


    return (
        <div>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" />
                <br></br>
                <input type="password" name="password" placeholder="Password" />
                <br></br>
                <input type="date" name="dob" placeholder="Date of Birth" />
                <button type="submit">Submit</button>
            </form>
            <p className="log" id="log">{log}</p>
        </div>
    )
}

export default Signup;
