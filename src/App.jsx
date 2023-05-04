import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrawerNav from "./components/DrawerNav";
import NavBar from "./components/NavBar";
import AuthContextProvider from "./context/AuthContext";
import PortfolioContextProvider from "./context/PortfolioContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Portfolio from "./pages/Portfolio";
import Quotes from "./pages/Quotes";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Home from "./pages/Home";
import StockData from "./pages/StockData";
import Action from "./pages/Action";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthContextProvider>
                    <PortfolioContextProvider>
                        <ToastContainer />
                        {/* <NavBar /> */}
                        <DrawerNav />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/quotes" element={<Quotes />} />
                            <Route path="/quote">
                                <Route path=":symbol" element={<StockData />}></Route>
                            </Route>
                            <Route path="/buy" element={<Action />} />
                            <Route path="/sell" element={<Action />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </PortfolioContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
