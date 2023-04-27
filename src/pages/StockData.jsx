import { useNavigate, useParams } from "react-router-dom";
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
                <div>
                    <h1>{symbol}</h1>
                    <p>{quote.name}</p>
                    <p>avg volume: {quote.average_volume}</p>
                    <p>change: {quote.change}</p>
                    <p>currency: {quote.currency}</p>
                    <p>datetime: {quote.datetime}</p>
                    <p>exchange: {quote.exchange}</p>
                    <p>high: {quote.high}</p>
                    <p>low: {quote.low}</p>
                    <p>open: {quote.open}</p>
                    <p>close: {quote.close}</p>
                    <p>percent_change: {quote.percent_change}</p>
                    <p>previous_close: {quote.previous_close}</p>
                    <p>volume: {quote.volume}</p>
                    <p>52week: {Object.entries(quote.fifty_two_week).join(" ")}</p>
                </div>
            )}
            <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    );
};

export default StockData;
