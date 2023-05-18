import "./Action.scss";
import { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { AccessTimeFilled, AutoStories, House } from "@mui/icons-material";

const Action = () => {
    const { open, action, getPortfolio, profile, toastStyle, placed, setPlaced } =
        useContext(PortfolioContext);
    const { currentUser } = useContext(AuthContext);
    const [qty, setQty] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setPlaced(false);
        if (!location.state) {
            return navigate("/");
        }
        getPortfolio();
    }, [currentUser]);

    const quote = location?.state;
    const buy = quote?.buy;

    const handleOrder = e => {
        e.preventDefault();
        if (!window.confirm(`Confirm ${buy ? "Buy" : "Sell"} ${qty} shares of ${quote?.symbol}`))
            return;
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

    const nav = path => {
        setPlaced(false);
        navigate(path);
    };

    return (
        <div
            className="Action"
            style={{ marginLeft: open && window.innerWidth > 800 ? "240px" : "0" }}
        >
            {placed ? (
                <div>
                    <h1 className="success">Success!</h1>
                    <CheckCircleOutlineIcon sx={{ fontSize: "240px", color: "green" }} />
                    <h1>Your order has been placed!</h1>
                    <div className="buttons">
                        <Button variant="outlined" onClick={() => nav("/")}>
                            Back To Home
                            <House />
                        </Button>
                        <Button variant="outlined" onClick={() => nav("/history")}>
                            Transactions
                            <AccessTimeFilled />
                        </Button>
                        <Button variant="outlined" onClick={() => nav("/portfolio")}>
                            Portfolio
                            <AutoStories />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
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
                                setQty(
                                    e.target.value > 0 && e.target.value < 10000
                                        ? e.target.value
                                        : 1
                                )
                            }
                        ></TextField>
                        <p>Total Cost: $ {qty !== "" ? (quote?.price * qty).toFixed(2) : 0} USD</p>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                                window.confirm("Return Without Placing Order?") && navigate(-1)
                            }
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" color="success" type="submit">
                            Submit
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Action;
