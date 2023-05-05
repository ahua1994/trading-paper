import { toast } from "react-toastify";
import { db, auth } from "../helpers/firebase";
import { createContext, useState } from "react";
import {
    getDoc,
    doc,
    deleteDoc,
    onSnapshot,
    updateDoc,
    arrayUnion,
    increment,
} from "firebase/firestore";
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

    const purchase = async order => {
        if (!order?.uid) {
            toast("Login To Purchase", toastStyle);
            return navigate("/login");
        }
        try {
            const docRef = doc(db, "portfolios", order.uid);
            //use arrayUnion,arrayRemove, increment <-- can add or sub
            // const profile = (await getDoc(docRef)).data();
            // console.log(profile);
            console.log(order);
            await updateDoc(docRef, {
                assets: arrayUnion({
                    symbol: order.symbol,
                    name: order.name,
                    currency: order.currency,
                    total: order.total,
                    quantity: order.quantity,
                }),
                transactions: arrayUnion({ ...order }),
                cash: increment(order.total * -1),
            });
        } catch (err) {
            return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        }
        return toast.success("Order Placed!", toastStyle);
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
