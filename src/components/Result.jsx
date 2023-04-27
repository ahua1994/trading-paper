import "./Result.scss";
import getSymbolFromCurrency from "currency-symbol-map";
import { getCode } from "country-list";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";

const Result = ({ x }) => {
    const navigate = useNavigate();
    const CC = getCode(
        x.country === "United States"
            ? "United States of America"
            : x.country === "United Kingdom"
            ? "United Kingdom of Great Britain and Northern Ireland"
            : x.country
    );
    return (
        <div className="Result" onClick={() => navigate(`/quote/${x.symbol}`)}>
            <div className="heading">
                <h1> {x.symbol}</h1>
                <p style={{ margin: "0" }}>{x.instrument_name}</p>
            </div>
            <p>
                <Flag
                    code={CC}
                    fallback={
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_the_United_Nations_%281945-1947%29.svg/2560px-Flag_of_the_United_Nations_%281945-1947%29.svg.png"
                            alt={x.country}
                        ></img>
                    }
                />{" "}
                {x.country}
            </p>
            <div>
                Exchange: <span>{x.exchange}</span>
            </div>
            <p>
                Currency: {x.currency} ({getSymbolFromCurrency(x.currency)})
            </p>
        </div>
    );
};

export default Result;
