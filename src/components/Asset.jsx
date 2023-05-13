import "./Asset.scss";
import getSymbolFromCurrency from "currency-symbol-map";
import Flag from "react-world-flags";

const Asset = ({ x, value }) => {
    const unrealized = value - x.total;
    const percent = (unrealized / value) * 100;
    return (
        <div className="Asset">
            <div className="assetgrid">
                <p>
                    <Flag code={"US"} /> {x.symbol} - {x.name}
                </p>
                <p> {x.quantity} shares</p>
                <p>Market Value: </p>
                <p>${value?.toFixed(2)}</p>
                <p>Book Cost:</p>
                <p>
                    {getSymbolFromCurrency(x.currency)}
                    {x.total.toFixed(2)}
                </p>
                <p>Unrealized:</p>
                <p>
                    {unrealized.toFixed(2)} ({percent.toFixed(unrealized ? 4 : 2)}%)
                </p>
            </div>
            <hr />
        </div>
    );
};

export default Asset;
