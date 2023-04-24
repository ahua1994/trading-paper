import "./Home.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MarketStatus from "../components/MarketStatus";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [markets, setMarkets] = useState([]);
    useEffect(() => {
        fetch(
            `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${process.env.API_KEY}`
        )
            .then(x => x.json())
            .then(x => setMarkets(x.markets));
    }, []);
    return (
        <div className="Home">
            <div className="market-status">
                {markets.map((market, i) => (
                    <MarketStatus key={i} market={market} />
                ))}
            </div>
        </div>
    );
};

export default Home;
