import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField } from "@mui/material";

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
    // useEffect(()=>{
    //     setLoginEmail("")
    //     setLoginPassword("")
    // },[])
    return (
        <div>
            <TextField variant="filled" label="Email"></TextField>
            <TextField variant="filled" label="Password"></TextField>
            <Button variant="contained" color="success">
                Login
            </Button>
        </div>
    );
};

export default Login;
