import { TextField, Button, Typography } from "@mui/material";
import "./Quotes.scss";
import { useContext, useState } from "react";
import Result from "../components/Result";
import { PortfolioContext } from "../context/PortfolioContext";

const Quotes = () => {
    const [search, setSearch] = useState("");
    const [prev, setPrev] = useState("");
    const [result, setResult] = useState([]);
    const [range, setRange] = useState(5);
    const { open } = useContext(PortfolioContext);

    const getResults = async search => {
        try {
            await fetch(`https://api.twelvedata.com/symbol_search?symbol=${search}&source=docs`)
                .then(x => x.json())
                .then(x => setResult(search === "" ? [] : x.data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setPrev(search ? `Search Results for "${search}" : ` : search);
        getResults(search);
        setRange(5);
        setSearch("");
    };

    return (
        <div
            className="Quotes"
            style={{ marginLeft: open && window.innerWidth > 800 ? "240px" : "0" }}
        >
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
            {prev && (
                <h2>
                    {result?.length}{" "}
                    {result?.length !== 1 ? prev : prev.replace("Results", "Result")}
                </h2>
            )}
            <div className="results">
                {result?.slice(0, range).map((x, i) => (
                    <Result x={x} key={i} />
                ))}
                {range < result.length && (
                    <Button onClick={() => setRange(range + 5)} variant="contained" color="success">
                        Show More
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Quotes;
