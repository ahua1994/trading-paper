import "./Portfolio.scss";
import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import getSymbolFromCurrency from "currency-symbol-map";
import { AuthContext } from "../context/AuthContext";

const Portfolio = () => {
    const { open, getPortfolio, profile } = useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        getPortfolio();
    }, [currentUser]);

    return (
        <div className="Portfolio" style={{ marginLeft: open ? "240px" : "0" }}>
            <h1> Portfolio</h1>
            <hr />
            <h1>US Holdings</h1>
            {profile.assets?.map(x => (
                <div key={x.name}>
                    <p>
                        {x.symbol} {x.name} {x.quantity} shares {getSymbolFromCurrency(x.currency)}
                        {x.total} {x.currency}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Portfolio;
