import "./Portfolio.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import Asset from "../components/Asset";

const Portfolio = () => {
    const { open, getPortfolio, profile, setProfile, addFunds, reset } =
        useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);
    const [assetsTotal, setAssetsTotal] = useState({});

    useEffect(() => {
        currentUser ? getPortfolio() : setProfile({});
    }, [currentUser]);

    let obj = {};
    useEffect(() => {
        profile?.assets?.map(x =>
            fetch(
                `https://finnhub.io/api/v1/quote?symbol=${x.symbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`
            )
                .then(data => data.json())
                .then(data => (obj[x.symbol] = data.c * x.quantity))
        );
        setAssetsTotal(obj);
        console.log(obj);
    }, []);

    // total assets almost works, not reliable
    // maybe make state that triggers rerender if no values

    const totals = Object.values(assetsTotal);
    const fullValue = totals.length !== 0 ? totals.reduce((acc, x) => acc + x) : 0;
    console.log(assetsTotal);
    return (
        <div className="Portfolio" style={{ marginLeft: open ? "240px" : "0" }}>
            <h1> Portfolio</h1>
            <p>cash: $ {profile?.cash?.toFixed(2)}</p>
            <p>total assets: $ {(fullValue + profile?.cash)?.toFixed(2)}</p>
            <h1>US Holdings</h1>
            {profile?.assets?.map((x, i) => (
                <Asset key={i} x={x} value={assetsTotal[x.symbol]} />
            ))}
            <p>total: $ {fullValue?.toFixed(2)}</p>

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
