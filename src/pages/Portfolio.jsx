import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const Portfolio = () => {
    const { open } = useContext(PortfolioContext);
    return <div style={{ marginLeft: open ? "240px" : "0" }}>Portfolio</div>;
};

export default Portfolio;
