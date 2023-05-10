import "./Asset.scss";
import { useContext, useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { PortfolioContext } from "../context/PortfolioContext";

const Asset = ({ x }) => {
    const [value, setValue] = useState();
    const { assetsTotal, setAssetsTotal } = useContext(PortfolioContext);

    useEffect(() => {
        fetch(
            `https://finnhub.io/api/v1/quote?symbol=${x.symbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`
        )
            .then(data => data.json())
            .then(data => setValue(data.c));
    }, []);

    return (
        <div className="Asset">
            <p>
                {x.symbol} {x.name} {x.quantity} shares Book Cost:{" "}
                {getSymbolFromCurrency(x.currency)}
                {x.total.toFixed(2)} {x.currency}
            </p>
            <p>current: ${(value * x.quantity).toFixed(2)}</p>
        </div>
    );
};

export default Asset;
