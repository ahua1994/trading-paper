import { toast } from "react-toastify";
import { db, auth } from "../helpers/firebase";
import { createContext, useState } from "react";
import { getDoc, doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const PortfolioContext = createContext();

const PortfolioContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState({});
    const [assetsTotal, setAssetsTotal] = useState({});
    const [price, setPrice] = useState(0);

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

    const getCurrentPrice = async symbol => {
        fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_KEY}`
        )
            .then(x => x.json())
            .then(x => setPrice(+x.c));
    };

    const action = async (order, buy) => {
        try {
            const docRef = doc(db, "portfolios", auth.currentUser.uid);
            //use arrayUnion,arrayRemove, increment <-- can add or sub
            const profile = (await getDoc(docRef)).data();
            let assets = [...profile.assets];
            let index = assets.findIndex(x => x.symbol === order.symbol);
            if (index !== -1) {
                if (!buy && assets[index].quantity < order.quantity) {
                    return toast.error(
                        "Insufficient Stock In Your Portfolio. Please Review Your Order.",
                        toastStyle
                    );
                } else if (!buy && assets[index].quantity === order.quantity) {
                    assets.splice(index, 1);
                } else {
                    assets[index].total += buy ? order.total : order.total * -1;
                    assets[index].quantity += buy ? order.quantity : order.quantity * -1;
                }
            } else if (!buy) {
                return toast.error(
                    "Insufficient Stock In Your Portfolio. Please Review Your Order.",
                    toastStyle
                );
            }
            await updateDoc(docRef, {
                assets:
                    index !== -1
                        ? assets
                        : arrayUnion({
                              symbol: order.symbol,
                              name: order.name,
                              currency: order.currency,
                              total: order.total,
                              quantity: order.quantity,
                          }),
                transactions: arrayUnion({ ...order }),
                cash: increment(buy ? order.total * -1 : order.total),
            });
        } catch (err) {
            return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        }
        getPortfolio();
        navigate("/portfolio");
        return toast.success("Order Placed!", toastStyle);
    };

    const addFunds = async total => {
        if (total >= 1000)
            return toast.error("Funds only available below $1000 USD total assets", toastStyle);
        const docRef = doc(db, "portfolios", auth.currentUser.uid);
        try {
            await updateDoc(docRef, {
                cash: increment(10000),
            });
        } catch (err) {
            return toast.error(err.message.replace("Unable To Add Funds"), toastStyle);
        }
        getPortfolio();
        return toast.success("Added Funds!", toastStyle);
    };

    const reset = async () => {
        const docRef = doc(db, "portfolios", auth.currentUser.uid);
        try {
            await updateDoc(docRef, {
                cash: 10000,
                assets: [],
                transactions: [],
            });
        } catch (err) {
            return toast.error(err.message.replace("Unable To Reset Account"), toastStyle);
        }
        getPortfolio();
        return toast.success("Your account has been reset", toastStyle);
    };

    return (
        <PortfolioContext.Provider
            value={{
                action,
                open,
                setOpen,
                toastStyle,
                getPortfolio,
                setProfile,
                profile,
                price,
                getCurrentPrice,
                addFunds,
                reset,
                assetsTotal,
                setAssetsTotal,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};

export default PortfolioContextProvider;
