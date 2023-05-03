import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PortfolioContext } from "../context/PortfolioContext";

const Register = () => {
    const {
        registerUsername,
        registerEmail,
        registerPassword,
        setRegisterUsername,
        setRegisterEmail,
        setRegisterPassword,
        handleRegister,
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const { open } = useContext(PortfolioContext);
    useEffect(() => {
        setRegisterUsername("");
        setRegisterEmail("");
        setRegisterPassword("");
    }, []);
    return (
        <div className="Login" style={{ marginLeft: open ? "240px" : "0" }}>
            <form onSubmit={handleRegister}>
                <Box>
                    <Typography sx={{ fontSize: "2rem" }}>Register</Typography>
                    <TextField
                        variant="filled"
                        label="Username"
                        onChange={e => setRegisterUsername(e.target.value)}
                        value={registerUsername}
                        required
                    ></TextField>
                    <TextField
                        variant="filled"
                        label="Email"
                        onChange={e => setRegisterEmail(e.target.value)}
                        value={registerEmail}
                        type="email"
                        required
                    ></TextField>
                    <TextField
                        variant="filled"
                        label="Password"
                        onChange={e => setRegisterPassword(e.target.value)}
                        value={registerPassword}
                        type="password"
                        required
                    ></TextField>
                    <Typography style={{ marginTop: "2rem", textAlign: "center" }}>
                        Already have an account?{" "}
                        <span
                            style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => navigate("/login")}
                        >
                            Login Here!
                        </span>
                    </Typography>
                    <Button type="submit" variant="contained" color="success">
                        Register
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Register;
