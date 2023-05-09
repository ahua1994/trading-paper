import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateUnAuthRouter = () => {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <Navigate to={"/"} /> : <Outlet />;
};

export default PrivateUnAuthRouter;
