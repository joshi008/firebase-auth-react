import React, { useContext, useState } from 'react'
import firebaseConfig from '../config'
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {
    const [log, setLog] = useState("");
    let dob = "";

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements[0];
        const password = e.target.elements[1];

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
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form>
            <p className="log" id="log">{log}</p>
        </div>
    )
}

export default Login
