import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthContextProvider from "./context/AuthContext";
import PortfolioContextProvider from "./context/PortfolioContext";
import { ToastContainer } from "react-toastify";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthContextProvider>
                    <PortfolioContextProvider>
                        <ToastContainer>
                            <NavBar />
                            <Routes>
                                <Route path="/" />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/history" element={<History />} />
                                <Route path="/portfolio" element={<Portfolio />} />
                                <Route path="*" element={<Error />} />
                            </Routes>
                        </ToastContainer>
                    </PortfolioContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
