import "./Portfolio.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import Asset from "../components/Asset";

const Portfolio = () => {
    const { open, getPortfolio, profile, addFunds, reset } = useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);
    const [assetsTotal, setAssetsTotal] = useState({});
    const [render, setRender] = useState(false);
    let obj = useRef({});

    const totals = Object.values(assetsTotal);
    const fullValue = totals.length !== 0 ? totals.reduce((acc, x) => acc + x) : 0;
    const bookCosts = profile?.assets?.reduce((acc, x) => acc + x.total, 0);
    const unrealized = fullValue - bookCosts;

    useEffect(() => {
        getPortfolio();
    }, [currentUser]);
    console.log(profile);

    useEffect(() => {
        profile?.assets?.map(x =>
            fetch(
                `https://finnhub.io/api/v1/quote?symbol=${x.symbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`
            )
                .then(data => data.json())
                .then(data => (obj.current[x.symbol] = data.c * x.quantity))
        );
        setAssetsTotal(obj.current);

        const interval = setInterval(() => {
            if (profile?.assets?.length !== totals.length) setRender(!render);
        }, 1000);

        return () => clearInterval(interval);
    }, [render]);

    return (
        <div
            className="Portfolio"
            style={{ marginLeft: open && window.innerWidth > 800 ? "240px" : "0" }}
        >
            <div className="heading">
                <h1>{profile.username}'s Portfolio</h1>
                <hr />
                <p>Cash: $ {profile?.cash?.toFixed(2)} USD</p>
                <p>Investments: $ {fullValue?.toFixed(2)} USD</p>
                <p>Total Assets: $ {(fullValue + profile?.cash)?.toFixed(2)} USD</p>
                <p>
                    Total Unrealized: ${" "}
                    <span
                        style={{ color: unrealized > 0 ? "rgb(89, 255, 89)" : "rgb(255, 50, 50)" }}
                    >
                        {unrealized.toFixed(2)}
                    </span>{" "}
                    USD
                </p>
                <hr />
                <h1>US Holdings</h1>
                <hr />
            </div>
            {profile?.assets?.map((x, i) => (
                <Asset key={i} x={x} value={assetsTotal[x.symbol]} />
            ))}
            <div className="buttons">
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
        </div>
    );
};

export default Portfolio;
