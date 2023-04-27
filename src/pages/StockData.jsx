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
    console.log(quote);
    return (
        <div className="StockData">
            {quote && (
                <div className="stats">
                    <div className="stats_header">
                        <h1>
                            {symbol}
                            <span> ({quote.exchange}) </span>
                        </h1>
                        <h1>{quote.name}</h1>
                    </div>
                    <hr></hr>
                    <div className="stats_table">
                        <p>volume: </p>
                        <p>{quote.volume}</p>
                        <p>avg volume: </p>
                        <p>{quote.average_volume}</p>
                        <p>
                            <span>change:</span>
                        </p>
                        <p style={{ color: +quote.change > 0 ? "green" : "red" }}>
                            {(+quote.change).toFixed(2)}
                        </p>
                        <p>
                            <span>percent_change: </span>
                        </p>
                        <p style={{ color: +quote.percent_change > 0 ? "green" : "red" }}>
                            {quote.percent_change} <span>%</span>
                        </p>
                        <p>currency:</p>
                        <p>
                            {getSymbolFromCurrency(quote.currency)} {quote.currency}
                        </p>
                        <p>datetime: </p>
                        <p>{quote.datetime}</p>
                        <p>high: </p>
                        <p>{(+quote.high).toFixed(2)}</p>
                        <p>low: </p>
                        <p>{(+quote.low).toFixed(2)}</p>
                        <p>status: </p>
                        <p>{String(quote.is_market_open)}</p>
                        <p>is open: </p>
                        <p>{(+quote.open).toFixed(2)}</p>
                        <p>close: </p>
                        <p>{(+quote.close).toFixed(2)}</p>
                        <p>previous_close: </p>
                        <p>{(+quote.previous_close).toFixed(2)}</p>
                    </div>
                    <p>
                        52week:
                        {Object.entries(quote.fifty_two_week).join(" ")}
                    </p>
                </div>
            )}
            <Button variant="contained" color="secondary" onClick={() => navigate("/quotes")}>
                Go Back
            </Button>
        </div>
    );
};

export default StockData;
