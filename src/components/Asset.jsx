import "./Asset.scss";
import getSymbolFromCurrency from "currency-symbol-map";
import Flag from "react-world-flags";

const Asset = ({ x, value }) => {
    const unrealized = +(value - x.total).toFixed(2);
    const percent = (unrealized / value) * 100;
    const curSign = getSymbolFromCurrency(x.currency) + " ";
    const red = "rgb(255, 50, 50)";
    const grn = "rgb(89, 255, 89)";

    return (
        <div className="Asset">
            <div className="assetgrid">
                <p>
                    <Flag code={"US"} /> {x.symbol} - {x.name}
                </p>
                <p> {x.quantity} shares</p>
                <p>Average Cost: </p>
                <p>{curSign + (x.total / x.quantity).toFixed(2)}</p>
                <p>Market Value: </p>
                <p>{curSign + value?.toFixed(2)}</p>
                <p>Book Cost:</p>
                <p>{curSign + x.total.toFixed(2)}</p>
                <p>Unrealized:</p>
                <p style={{ color: !unrealized ? "unset" : unrealized > 0 ? grn : red }}>
                    {unrealized.toFixed(2)} ({percent.toFixed(unrealized ? 4 : 2)}%)
                </p>
            </div>
            <hr />
        </div>
    );
};

export default Asset;
