// import "./Sell.scss";
import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { useParams } from "react-router-dom";

const Sell = () => {
    const { symbol } = useParams();
    const { open } = useContext(PortfolioContext);
    return <div className="Sell" style={{ marginLeft: open ? "240px" : "0" }}></div>;
};

export default Sell;
