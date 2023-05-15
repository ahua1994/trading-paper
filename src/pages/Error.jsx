import React, { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const Error = () => {
    const { open } = useContext(PortfolioContext);
    return (
        <div
            style={{
                marginLeft: open && window.innerWidth > 800 ? "240px" : "0",
                transition: "ease 0.3s",
            }}
        >
            Error
        </div>
    );
};

export default Error;
