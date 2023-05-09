import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateAuthRouter = () => {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateAuthRouter;
