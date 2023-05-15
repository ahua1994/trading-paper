import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const Charts = () => {
    const { open } = useContext(PortfolioContext);
    return (
        <div
            className="Charts"
            style={{ marginLeft: open && window.innerWidth > 800 ? "240px" : "0" }}
        >
            Charts are unavailable.
        </div>
    );
};

export default Charts;
