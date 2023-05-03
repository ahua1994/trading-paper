import { toast } from "react-toastify";
import { db } from "../helpers/firebase";
import { createContext, useState } from "react";
import { addDoc, setDoc, collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const PortfolioContext = createContext();

const PortfolioContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const toastStyle = {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
    };

    const buy = async (obj, uid) => {
        if (!uid) {
            toast("Login To Purchase", toastStyle);
            return navigate("/login");
        }
        console.log("bought");
        const docRef = doc(db, "/stocks/" + obj.postId);
    };

    const sell = () => {};

    return (
        <PortfolioContext.Provider value={{ buy, sell, open, setOpen, toastStyle }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export default PortfolioContextProvider;
