import "./Action.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, TextField } from "@mui/material";

const Action = () => {
    const { open, purchase, getPortfolio, profile } = useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);
    const [qty, setQty] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    useEffect(() => {
        if (!location.state) {
            return navigate("/");
        }
        getPortfolio();
    }, [currentUser]);
    const quote = location?.state;
    const buy = quote?.buy;
    return (
        <div className="Action" style={{ marginLeft: open ? "240px" : "0" }}>
            {buy ? "Buy" : "Sell"}
            <h1>{quote?.symbol}</h1>
            <h3>{quote?.name}</h3>
            <p>Price: $ {quote?.price} USD</p>
            <p>Total Cash: $ {profile?.cash} USD</p>
            <TextField
                required
                label="Quantity"
                variant="filled"
                type="number"
                value={qty}
                onChange={e =>
                    setQty(e.target.value > 0 && e.target.value < 10000 ? e.target.value : 1)
                }
            ></TextField>
            <p>Total Cost: $ {qty !== "" ? (quote?.price * qty).toFixed(2) : 0} USD</p>
            <Button onClick={() => window.confirm("Return without placing order?") && navigate(-1)}>
                Cancel
            </Button>
            <Button>Submit</Button>
        </div>
    );
};

export default Action;
