import "./NavBar.scss";
import { useContext } from "react";
import { Drawer } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className="NavBar">
            <p onClick={logout}>Logout </p>
            <p>Sign In </p>
            <p>Register </p>
        </div>
    );
};

export default NavBar;
