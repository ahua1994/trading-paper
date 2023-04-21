import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    // https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=
    return (
        <div className="Home">
            <p>Home</p>
        </div>
    );
};

export default Home;
