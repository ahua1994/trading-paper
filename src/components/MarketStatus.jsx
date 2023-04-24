import React from "react";

const MarketStatus = ({ market }) => {
    return (
        <div className="Status">
            <p>type: {market.market_type}</p>
            <p>region: {market.region}</p>
            <p>
                exchanges:{" "}
                {market.primary_exchanges.split(", ").map(x => (
                    <span key={x}> {x}</span>
                ))}
            </p>
            <p>
                local hours: {market.local_open} to {market.local_close}
            </p>
            <p>
                status:{" "}
                <span style={{ background: market.current_status === "open" ? "green" : "red" }}>
                    {market.current_status}
                </span>
            </p>
            <p>{market.notes}</p>
        </div>
    );
};

export default MarketStatus;
