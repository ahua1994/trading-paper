import { toast } from "react-toastify";
import { createContext, useState } from "react";

export const PortfolioContext = createContext();

const PortfolioContextProvider = ({ children }) => {
    return <PortfolioContext.Provider value={{}}>{children}</PortfolioContext.Provider>;
};

export default PortfolioContextProvider;
