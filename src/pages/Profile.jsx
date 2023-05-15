import "./Profile.scss";
import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccessTimeFilled, AutoStories } from "@mui/icons-material";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const { profile, getPortfolio, open } = useContext(PortfolioContext);
    const navigate = useNavigate();

    useEffect(() => {
        getPortfolio();
    }, [currentUser]);

    return (
        <div
            className="Profile"
            style={{ marginLeft: open && window.innerWidth > 800 ? "240px" : "0" }}
        >
            <h1>{profile?.username}'s Profile</h1>
            <Avatar>{profile?.username?.slice(0, 1)}</Avatar>
            <p>{profile?.email}</p>
            <p>Cash: ${profile?.cash?.toFixed(2)} USD</p>
            <p>Joined: {profile?.joined}</p>
            <div className="buttons">
                <Button variant="outlined" onClick={() => navigate("/portfolio")}>
                    Portfolio
                    <AutoStories />
                </Button>
                <Button variant="outlined" onClick={() => navigate("/history")}>
                    History
                    <AccessTimeFilled />
                </Button>
            </div>
        </div>
    );
};

export default Profile;
