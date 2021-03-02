import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Home() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <h1>Home</h1>

            <Link to="/login">Login</Link>
            <br></br>
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Home
