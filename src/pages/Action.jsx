// import "./Buy.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { useLocation, useNavigate } from "react-router-dom";

const Action = () => {
    const { open, buy } = useContext(PortfolioContext);
    const [qty, setQty] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    useEffect(() => {
        if (!location.state) {
            return navigate("/");
        }
    }, []);
    return (
        <div className="Action" style={{ marginLeft: open ? "240px" : "0" }}>
            {location.state?.buy ? "Buy" : "Sell"}
        </div>
    );
};

export default Action;
