import "./Action.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

const Action = () => {
    const { open, action, getPortfolio, profile, toastStyle } = useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);
    const [buying, setBuying] = useState(false);
    const [qty, setQty] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            return navigate("/");
        }
        getPortfolio();
    }, [currentUser]);

    const quote = location?.state;
    const buy = quote?.buy;

    const handleOrder = e => {
        e.preventDefault();
        let total = Number((quote?.price * +qty).toFixed(2));
        if (buy && total > profile?.cash) return toast.error("Insufficient Funds", toastStyle);
        let order = {
            symbol: quote?.symbol,
            name: quote?.name,
            quantity: +qty,
            date: new Date().toUTCString(),
            price: Number(quote?.price),
            total,
            currency: quote?.currency,
            action: buy ? "buy" : "sell",
        };
        action(order, buy);
    };

    return (
        <div className="Action" style={{ marginLeft: open ? "240px" : "0" }}>
            {buy ? "Buy" : "Sell"}
            <h1>{quote?.symbol}</h1>
            <h3>{quote?.name}</h3>
            <p>Price: $ {quote?.price} USD</p>
            <p>Total Cash: $ {profile?.cash?.toFixed(2)} USD</p>
            <form onSubmit={handleOrder}>
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
                <Button
                    onClick={() => window.confirm("Return without placing order?") && navigate(-1)}
                >
                    Cancel
                </Button>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Action;
