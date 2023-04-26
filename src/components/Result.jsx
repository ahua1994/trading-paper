import "./Result.scss";
import getSymbolFromCurrency from "currency-symbol-map";

const Result = ({ x }) => {
    // getSymbolFromCurrency
    // currencyToSymbolMap
    return (
        <div className="Result">
            <p>{x["2. name"]}</p>
            <p>Symbol: {x["1. symbol"]}</p>
            <p>{x["4. region"]}</p>
            <p>
                {x["8. currency"]} {getSymbolFromCurrency(x["8. currency"])}
            </p>
        </div>
    );
};

export default Result;
