import React, { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const Error = () => {
    const { open } = useContext(PortfolioContext);
    return <div style={{ marginLeft: open ? "240px" : "0" }}>Error</div>;
};

export default Error;
