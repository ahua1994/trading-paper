import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, TextField } from "@mui/material";

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
    // useEffect(()=>{
    //     setLoginEmail("")
    //     setLoginPassword("")
    // },[])
    return (
        <div>
            <TextField
                variant="filled"
                label="Username"
                onChange={(e = setRegisterUsername(e.target.value))}
                value={registerUsername}
                required
            ></TextField>
            <TextField
                variant="filled"
                label="Email"
                onChange={(e = setRegisterEmail(e.target.value))}
                value={registerEmail}
                type="email"
                required
            ></TextField>
            <TextField
                variant="filled"
                label="Password"
                onChange={(e = setRegisterPassword(e.target.value))}
                value={registerPassword}
                type="password"
                required
            ></TextField>
            <Button variant="contained" color="success">
                Register
            </Button>
        </div>
    );
};

export default Register;
