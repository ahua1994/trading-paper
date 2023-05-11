import "./Asset.scss";
import getSymbolFromCurrency from "currency-symbol-map";

const Asset = ({ x, value }) => {
    return (
        <div className="Asset">
            <p>
                {x.symbol} {x.name} {x.quantity} shares Book Cost:{" "}
                {getSymbolFromCurrency(x.currency)}
                {x.total.toFixed(2)} {x.currency}
            </p>
            <p>current: ${value?.toFixed(2)}</p>
        </div>
    );
};

export default Asset;
