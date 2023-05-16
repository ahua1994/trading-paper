import "./Home.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import MarketStatus from "../components/MarketStatus";
import Disclaimer from "../components/Disclaimer";

const Home = () => {
    const { open } = useContext(PortfolioContext);
    const [markets, setMarkets] = useState([]);
    useEffect(() => {
        fetch(
            `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${process.env.REACT_APP_ALPHA_KEY}`
        )
            .then(x => x.json())
            .then(x => setMarkets(x.markets));
    }, []);
    return (
        <div
            className="Home"
            style={{ marginLeft: open && window.innerWidth > 800 ? "240px" : "0" }}
        >
            <Disclaimer />
            <h1>Global Market Status</h1>
            <div className="market-status">
                {markets
                    ? markets?.map((market, i) => <MarketStatus key={i} market={market} />)
                    : ["", "Limit of 5 Calls/Min Reached. Try Again Later."].map((x, i) => (
                          <h1 key={i}>{x}</h1>
                      ))}
            </div>
        </div>
    );
};

export default Home;
