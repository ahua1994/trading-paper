import "./Login.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {
        loginEmail,
        loginPassword,
        setLoginEmail,
        setLoginPassword,
        handleLogin,
        signInProvider,
        forgetPassword,
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [forgot, setForgot] = useState(false);
    useEffect(() => {
        setLoginEmail("");
        setLoginPassword("");
    }, []);
    return (
        <div className="Login">
            {forgot ? (
                <Box>
                    <Typography sx={{ fontSize: "2rem" }}>Retrieve Password</Typography>
                    <TextField
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        variant="filled"
                        label="Email"
                    ></TextField>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={e => {
                            e.preventDefault();
                            forgetPassword(loginEmail);
                            setLoginEmail("");
                            setForgot(false);
                        }}
                    >
                        Send Password
                    </Button>
                    <Button
                        variant="contained"
                        onClick={e => {
                            e.preventDefault();
                            setLoginEmail("");
                            setForgot(false);
                        }}
                    >
                        Return
                    </Button>
                </Box>
            ) : (
                <form onSubmit={handleLogin}>
                    <Box>
                        <Typography sx={{ fontSize: "2rem" }}>Login</Typography>
                        <TextField
                            value={loginEmail}
                            onChange={e => setLoginEmail(e.target.value)}
                            variant="filled"
                            label="Email"
                            required
                        ></TextField>
                        <Typography>
                            Forgot Your Password?{" "}
                            <span
                                style={{ cursor: "pointer", color: "dodgerblue" }}
                                onClick={() => {
                                    setLoginEmail("");
                                    setLoginPassword("");
                                    setForgot(true);
                                }}
                            >
                                Click Here
                            </span>
                        </Typography>
                        <TextField
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            variant="filled"
                            label="Password"
                            required
                        ></TextField>
                        <Typography>
                            Don't have an account?{" "}
                            <span
                                style={{ cursor: "pointer", color: "dodgerblue" }}
                                onClick={() => navigate("/register")}
                            >
                                Register Here!
                            </span>
                        </Typography>
                        <Button type="submit" variant="contained" color="success">
                            Login
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default Login;
