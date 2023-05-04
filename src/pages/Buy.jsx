// import "./Buy.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { useParams } from "react-router-dom";

const Buy = () => {
    const { symbol } = useParams();
    const [qty, setQty] = useState(0);
    const { open, buy } = useContext(PortfolioContext);
    const [quote, setQuote] = useState();
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.REACT_APP_TWELVEDATA_KEY}&source=docs`
        )
            .then(x => x.json())
            .then(x => setQuote(x.status === "error" ? null : x));
        fetch(
            `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${process.env.REACT_APP_TWELVEDATA_KEY}&source=docs`
        )
            .then(x => x.json())
            .then(x => setPrice(+x.price));
    }, []);
    console.log(symbol);
    console.log(quote, price);
    return <div className="Buy" style={{ marginLeft: open ? "240px" : "0" }}></div>;
};

export default Buy;
