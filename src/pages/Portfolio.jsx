import "./Portfolio.scss";
import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import getSymbolFromCurrency from "currency-symbol-map";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";

const Portfolio = () => {
    const { open, getPortfolio, profile, setProfile } = useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        currentUser ? getPortfolio() : setProfile({});
    }, [currentUser]);

    const assetsTotal = profile?.assets?.reduce((acc, x) => acc + x.total, 0);

    return (
        <div className="Portfolio" style={{ marginLeft: open ? "240px" : "0" }}>
            <h1> Portfolio</h1>
            <p>cash: $ {profile?.cash?.toFixed(2)}</p>
            <p>total assets: $ {(assetsTotal + profile?.cash)?.toFixed(2)}</p>
            <hr />
            <h1>US Holdings</h1>
            {profile?.assets?.map(x => (
                <div key={x.name}>
                    <p>
                        {x.symbol} {x.name} {x.quantity} shares {getSymbolFromCurrency(x.currency)}
                        {x.total.toFixed(2)} {x.currency}
                    </p>
                </div>
            ))}
            <p>total: $ {assetsTotal?.toFixed(2)}</p>
            <Button variant="contained" color="success">
                Add Funds
            </Button>
        </div>
    );
};

export default Portfolio;
