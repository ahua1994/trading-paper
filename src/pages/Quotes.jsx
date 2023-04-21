import { TextField, Button, Typography } from "@mui/material";
import "./Quotes.scss";
import { useState } from "react";

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

    console.log(result);

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
            {result?.bestMatches?.map((x, i) => (
                <h1 key={i}>{x["2. name"]}</h1>
            ))}
        </div>
    );
};

export default Quotes;
