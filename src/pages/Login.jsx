import "./Login.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import google from "../helpers/google.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {
        loginEmail,
        loginPassword,
        forgot,
        setLoginEmail,
        setLoginPassword,
        setForgot,
        handleLogin,
        signInProvider,
        forgetPassword,
    } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        setLoginEmail("");
        setLoginPassword("");
    }, []);

    return (
        <div className="Login">
            {forgot ? (
                <form
                    onSubmit={e => {
                        forgetPassword(e, loginEmail);
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: "2rem" }}>Retrieve Password</Typography>
                        <TextField
                            value={loginEmail}
                            onChange={e => setLoginEmail(e.target.value)}
                            variant="filled"
                            label="Email"
                            required
                        ></TextField>
                        <Button variant="contained" color="success" type="submit">
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
                </form>
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
                                style={{ cursor: "pointer", color: "orange" }}
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
                            type="password"
                            required
                        ></TextField>
                        <Typography>
                            Don't have an account?{" "}
                            <span
                                style={{ cursor: "pointer", color: "orange" }}
                                onClick={() => navigate("/register")}
                            >
                                Register Here!
                            </span>
                        </Typography>
                        <Button
                            size="large"
                            style={{ marginTop: "2rem", backgroundColor: "#333" }}
                            variant="contained"
                            onClick={signInProvider}
                        >
                            <img style={{ width: "25px" }} src={google} alt="g-icon"></img>
                            &nbsp;&nbsp;&nbsp;&nbsp; Continue With Google
                        </Button>
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
