import { toast } from "react-toastify";
import { db, auth } from "../helpers/firebase";
import { createContext, useState } from "react";
import { addDoc, setDoc, collection, getDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const PortfolioContext = createContext();

const PortfolioContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState({});

    const toastStyle = {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
    };

    const getPortfolio = async () => {
        try {
            const docRef = doc(db, "portfolios", auth.currentUser.uid);
            const profile = await getDoc(docRef);
            setProfile(profile.data());
        } catch (err) {
            if (err.message === "Cannot read properties of null (reading 'uid')") return;
            return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        }
    };

    const purchase = async (obj, uid) => {
        if (!uid) {
            toast("Login To Purchase", toastStyle);
            return navigate("/login");
        }
        console.log("bought");
        const docRef = doc(db, "/stocks/" + obj.postId);
    };

    const sell = () => {};

    return (
        <PortfolioContext.Provider
            value={{ purchase, sell, open, setOpen, toastStyle, getPortfolio, profile }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};

export default PortfolioContextProvider;
