import { useNavigate, useParams } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import "./StockData.scss";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const StockData = () => {
    const navigate = useNavigate();
    const { symbol } = useParams();
    const [quote, setQuote] = useState();
    // https://api.twelvedata.com/quote?symbol=AAPL&apikey=demo&source=docs
    useEffect(() => {
        fetch(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.REACT_APP_TWELVEDATA_KEY}&source=docs`
        )
            .then(x => x.json())
            .then(x => setQuote(x.status === "error" ? null : x));
    }, []);
    const red = "rgb(255, 50, 50)";
    const grn = "rgb(89, 255, 89)";
    const f2w = quote?.fifty_two_week;
    return (
        <div className="StockData">
            {quote && (
                <div className="stats">
                    <p> {new Date(quote.datetime).toDateString()}</p>
                    <div className="stats_header">
                        <h1>
                            {symbol}{" "}
                            <span
                                style={{
                                    color: +quote.change > 0 ? grn : red,
                                }}
                            >
                                {+quote.change > 0 && "+"}
                                {(+quote.change).toFixed(2)} (
                                {(+quote.percent_change.replace("-", "")).toFixed(2)}%)
                            </span>
                        </h1>
                        <h1>
                            {quote.name}
                            <span> ({quote.exchange}) </span>
                        </h1>{" "}
                    </div>
                    <hr></hr>
                    <div className="stats_table">
                        <p>Volume </p>
                        <p>{quote.volume}</p>
                        <p>Avg Volume </p>
                        <p>{quote.average_volume}</p>
                        <p>Currency</p>
                        <p>
                            {getSymbolFromCurrency(quote.currency)} {quote.currency}
                        </p>
                        <p>Current</p>
                        <p>???</p>
                        <p>Change</p>
                        <p
                            style={{
                                color: +quote.change > 0 ? grn : red,
                            }}
                        >
                            {+quote.change > 0 && "+"}
                            {(+quote.change).toFixed(2)}
                        </p>
                        <p>Change %</p>
                        <p
                            style={{
                                color: +quote.change > 0 ? grn : red,
                            }}
                        >
                            {+quote.percent_change > 0 && "+"}
                            {(+quote.percent_change).toFixed(2)} %
                        </p>
                        <p>Open </p>
                        <p>{(+quote.open).toFixed(2)}</p>
                        <p>Close </p>
                        <p>{(+quote.close).toFixed(2)}</p>
                        <p>Prev Close </p>
                        <p>{(+quote.previous_close).toFixed(2)}</p>
                        <p>High </p>
                        <p>{(+quote.high).toFixed(2)}</p>
                        <p>Low </p>
                        <p>{(+quote.low).toFixed(2)}</p>
                        <p>Status </p>
                        <p>{quote.is_market_open ? "open" : "closed"}</p>
                        <p>52W High</p>
                        <p>{(+f2w.high).toFixed(2)}</p>
                        <p>52W Low</p>
                        <p>{(+f2w.low).toFixed(2)}</p>
                    </div>
                </div>
            )}
            <Button variant="contained" color="secondary" onClick={() => navigate("/quotes")}>
                Go Back
            </Button>
        </div>
    );
};

export default StockData;
