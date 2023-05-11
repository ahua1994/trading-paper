import "./Asset.scss";
import getSymbolFromCurrency from "currency-symbol-map";

const Asset = ({ x, value }) => {
    const unrealized = value - x.total;
    const percent = (unrealized / value) * 100;
    return (
        <div className="Asset">
            <p>
                {x.symbol} {x.name} | {x.quantity} shares
            </p>
            <p>Market Value: ${value?.toFixed(2)}</p>
            <p>
                Book Cost: {getSymbolFromCurrency(x.currency)}
                {x.total.toFixed(2)} {x.currency}
            </p>
            <p>
                Unrealized: {unrealized.toFixed(2)} ({percent.toFixed(unrealized ? 4 : 2)}%)
            </p>
            <hr />
        </div>
    );
};

export default Asset;
