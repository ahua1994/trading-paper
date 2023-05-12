import "./Portfolio.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import Asset from "../components/Asset";
import axios from "axios";

const Portfolio = () => {
    const { open, getPortfolio, profile, setProfile, addFunds, reset } =
        useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);
    const [assetsTotal, setAssetsTotal] = useState({});
    const [render, setRender] = useState(false);
    let obj = useRef({});

    useEffect(() => {
        currentUser ? getPortfolio() : setProfile({});
    }, [currentUser]);

    useEffect(() => {
        profile?.assets?.map(x =>
            fetch(
                `https://finnhub.io/api/v1/quote?symbol=${x.symbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`
            )
                .then(data => data.json())
                .then(data => (obj.current[x.symbol] = data.c * x.quantity))
        );
        setAssetsTotal(obj.current);
        console.log(totals);
        if (profile?.assets?.length !== totals.length) setRender(!render);
    }, [render]);

    // useEffect(() => {
    //     const stocks = profile.assets;
    //     stocks.length !== 0 &&
    //         axios
    //             .all(
    //                 stocks.map(x =>
    //                     axios.get(
    //                         `https://finnhub.io/api/v1/quote?symbol=${x.symbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`
    //                     )
    //                 )
    //             )
    //             .then(
    //                 axios.spread((...res) =>
    //                     res.map(
    //                         (x, i) =>
    //                             (obj.current[stocks[i].symbol] = x.data.c * stocks[i].quantity)
    //                     )
    //                 )
    //             )
    //             .catch(err => console.log(err));
    //     setAssetsTotal(obj.current);
    // }, []);

    // total assets works sometimes, not reliable
    // maybe make state that triggers rerender if no values

    const totals = Object.values(assetsTotal);
    const fullValue = totals.length !== 0 ? totals.reduce((acc, x) => acc + x) : 0;
    console.log(obj.current);

    return (
        <div className="Portfolio" style={{ marginLeft: open ? "240px" : "0" }}>
            <div className="heading">
                <h1> Portfolio</h1>
                <hr />
                <p>Cash: $ {profile?.cash?.toFixed(2)} USD</p>
                <p>Investments: $ {fullValue?.toFixed(2)} USD</p>
                <p>Total Assets: $ {(fullValue + profile?.cash)?.toFixed(2)} USD</p>
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
