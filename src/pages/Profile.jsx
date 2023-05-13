// import "./Profile.scss"
import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const Profile = () => {
    const { profile, getPortfolio, open } = useContext(PortfolioContext);
    useEffect(() => {
        getPortfolio();
    }, [currentUser]);
    return (
        <div className="Profile" style={{ marginLeft: open ? "240px" : "0" }}>
            {profile?.username}
        </div>
    );
};

export default Profile;
