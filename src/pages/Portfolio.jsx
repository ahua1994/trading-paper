import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import "./Portfolio.scss";

const Portfolio = () => {
    const { open } = useContext(PortfolioContext);
    return (
        <div className="Portfolio" style={{ marginLeft: open ? "240px" : "0" }}>
            Portfolio
        </div>
    );
};

export default Portfolio;
