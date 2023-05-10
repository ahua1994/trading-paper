import "./Portfolio.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import Asset from "../components/Asset";

const Portfolio = () => {
    const { open, getPortfolio, profile, setProfile, addFunds, reset, assetsTotal } =
        useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        currentUser ? getPortfolio() : setProfile({});
    }, [currentUser]);

    console.log(assetsTotal);
    const totals = Object.values(assetsTotal);
    const fullValue = totals.length !== 0 ? totals.reduce((acc, x) => acc + x) : 0;

    return (
        <div className="Portfolio" style={{ marginLeft: open ? "240px" : "0" }}>
            <h1> Portfolio</h1>
            <p>cash: $ {profile?.cash?.toFixed(2)}</p>
            <p>total assets: $ {(fullValue + profile?.cash)?.toFixed(2)}</p>
            <hr />
            <h1>US Holdings</h1>
            {profile?.assets?.map((x, i) => (
                <Asset key={i} x={x} />
            ))}
            <p>total: $ {fullValue}</p>

            <Button
                variant="contained"
                color="error"
                onClick={() => window.confirm("Completely Reset Your Account?") && reset()}
            >
                Reset Profile
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={() => addFunds(fullValue + profile?.cash)}
            >
                Add Funds
            </Button>
        </div>
    );
};

export default Portfolio;
