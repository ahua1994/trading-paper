import { TextField, Button, Typography } from "@mui/material";
import "./Quotes.scss";
import { useState } from "react";

const Quotes = () => {
    // https://cloud-sse.iexapis.com/stable/stock/nflx/quote?token=API_KEY
    // const baseUrl = "https://cloud-sse.iexapis.com/stable/stock/nflx/quote?token=";
    const [ticker, setTicker] = useState("");
    // const [results, setResults] = useState([]);
    const handleSubmit = e => {
        e.preventDefault();
        setTicker("");
    };

    return (
        <div className="Quotes">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4">Quotes</Typography>
                <TextField
                    id="filled-search"
                    label="Ticker/Symbol"
                    type="search"
                    variant="filled"
                    value={ticker}
                    onChange={e => setTicker(e.target.value)}
                />
                <Button type="submit" variant="contained" color="success">
                    Search
                </Button>
            </form>
        </div>
    );
};

export default Quotes;
