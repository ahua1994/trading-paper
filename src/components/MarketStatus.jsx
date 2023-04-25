const MarketStatus = ({ market }) => {
    const flags = {
        Global: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_the_United_Nations_%281945-1947%29.svg/2560px-Flag_of_the_United_Nations_%281945-1947%29.svg.png",
        Canada: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/255px-Flag_of_Canada_%28Pantone%29.svg.png",
        "United States":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/255px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png",
        "United Kingdom":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/255px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
        Brazil: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/243px-Flag_of_Brazil.svg.png",
        Germany:
            "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png",
        France: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Flag_of_France_%28lighter_variant%29.svg/250px-Flag_of_France_%28lighter_variant%29.svg.png",
        Spain: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/200px-Bandera_de_Espa%C3%B1a.svg.png",
        Japan: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/255px-Flag_of_Japan.svg.png",
        Portugal:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/255px-Flag_of_Portugal.svg.png",
        India: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png",
        "Mainland China":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/255px-Flag_of_the_People%27s_Republic_of_China.svg.png",
        "Hong Kong":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/200px-Flag_of_Hong_Kong.svg.png",
        Mexico: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/255px-Flag_of_Mexico.svg.png",
        "South Africa":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/255px-Flag_of_South_Africa.svg.png",
    };
    return (
        <div className="Status">
            <h3>
                {market.region === "Global" ? market.market_type : market.region}
                <img src={flags[market.region]} alt={market.region} />
            </h3>
            <div className="exchanges">
                {market.primary_exchanges.split(", ").map(x => (
                    <span key={x}> {x}</span>
                ))}
            </div>
            <p>
                Market Hours: {market.local_open} to {market.local_close} Locally
            </p>
            <p>
                Current Status:{" "}
                <span
                    style={{
                        background: market.current_status === "open" ? "#36b336" : "#d02a2a",
                    }}
                >
                    {market.current_status}
                </span>
            </p>
            <p>{market.notes}</p>
        </div>
    );
};

export default MarketStatus;
