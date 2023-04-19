import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="Home">
            <p>Home</p>
        </div>
    );
};

export default Home;
