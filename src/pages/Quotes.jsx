import { TextField, Button, Typography } from "@mui/material";
import "./Quotes.scss";
import { useState } from "react";
import Result from "../components/Result";

const Quotes = () => {
    // https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo single quote

    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const getResults = async search => {
        try {
            await fetch(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env.API_KEY}`
            )
                .then(x => x.json())
                .then(x => setResult(x));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        getResults(search);
        setSearch("");
    };

    return (
        <div className="Quotes">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4">Quotes</Typography>
                <TextField
                    id="filled-search"
                    label="Keyword/Symbol"
                    type="search"
                    variant="filled"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Button type="submit" variant="contained" color="success">
                    Search
                </Button>
            </form>
            <div className="results">
                {result?.bestMatches?.map((x, i) => (
                    <Result x={x} key={i} />
                ))}
            </div>
        </div>
    );
};

export default Quotes;
