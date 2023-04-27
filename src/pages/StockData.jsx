import { useNavigate, useParams } from "react-router-dom";
import "./StockData.scss";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const StockData = () => {
    const navigate = useNavigate();
    const { symbol } = useParams();
    const [quote, setQuote] = useState({});
    // https://api.twelvedata.com/quote?symbol=AAPL&apikey=demo&source=docs
    useEffect(() => {
        fetch(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.REACT_APP_TWELVEDATA_KEY}&source=docs`
        )
            .then(x => x.json())
            .then(x => setQuote(x));
    }, []);
    console.log(quote);
    return (
        <div className="StockData">
            <h1>{symbol}</h1>
            <p>{quote.name}</p>
            <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    );
};

export default StockData;
