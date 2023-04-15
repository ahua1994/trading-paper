import { TextField, Button } from "@mui/material";
import React from "react";

const Buy = () => {
    // https://cloud-sse.iexapis.com/stable/stock/nflx/quote?token=API_KEY
    return (
        <div>
            <TextField id="filled-search" label="Ticker/Symbol" type="search" variant="filled" />
            <Button variant="contained" color="success">
                Buy
            </Button>
        </div>
    );
};

export default Buy;
