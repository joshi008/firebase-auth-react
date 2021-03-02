import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import firebaseConfig from "../config"
import firebase from "firebase/app";
import "firebase/database";

function Dashboard(props) {

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
            <h1>Welcome!!!</h1>
            <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
            <h4>Your DOB is : {dob}</h4>
        </div>
    )
}

export default Dashboard;
