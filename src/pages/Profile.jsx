import "./Profile.scss";
import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const { profile, getPortfolio, open } = useContext(PortfolioContext);
    const navigate = useNavigate();
    useEffect(() => {
        getPortfolio();
    }, [currentUser]);
    console.log(profile);
    return (
        <div className="Profile" style={{ marginLeft: open ? "240px" : "0" }}>
            <Avatar>{profile?.username?.slice(0, 1)}</Avatar>
            <p>{profile?.username}</p>
            <p>Joined: {profile?.joined}</p>
            <p>Email: {profile?.email}</p>
            <p>Cash: {profile?.cash}</p>
            <div className="buttons">
                <Button onClick={() => navigate("/portfolio")}>Portfolio</Button>
                <Button onClick={() => navigate("/history")}>History</Button>
            </div>
        </div>
    );
};

export default Profile;
