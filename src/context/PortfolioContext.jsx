import { toast } from "react-toastify";
import { createContext, useState } from "react";

export const PortfolioContext = createContext();

const PortfolioContextProvider = ({ children }) => {
    const purchase = () => {};
    const sell = () => {};
    return (
        <PortfolioContext.Provider value={{ purchase, sell }}>{children}</PortfolioContext.Provider>
    );
};

export default PortfolioContextProvider;
