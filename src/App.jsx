import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrawerNav from "./components/DrawerNav";
import NavBar from "./components/NavBar";
import AuthContextProvider from "./context/AuthContext";
import PortfolioContextProvider from "./context/PortfolioContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Portfolio from "./pages/Portfolio";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthContextProvider>
                    <PortfolioContextProvider>
                        <ToastContainer />
                        <NavBar />
                        <DrawerNav />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />}></Route>
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
