import { auth, db } from "../helpers/firebase";
import { toast } from "react-toastify";
import { createContext, useState } from "react";
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [forgot, setForgot] = useState(false);
    const navigate = useNavigate();
    const toastStyle = {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
    };

    const handleRegister = async e => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await updateProfile(auth.currentUser, { displayName: registerUsername });
            await setDoc(doc(collection(db, "portfolios"), auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                cash: 10000,
                assets: [],
                transactions: [],
                joined: new Date().toUTCString(),
                username: registerUsername,
                email: auth.currentUser.email,
            });
        } catch (err) {
            return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        }
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterUsername("");
        toast.success("Registered Successfully!", toastStyle);
        navigate("/");
    };

    const forgetPassword = async (e, email) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setLoginEmail("");
            setForgot(false);
            return toast.success("Please Check Your Inbox", toastStyle);
        } catch (err) {
            return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        }
    };

    const signInProvider = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            const docRef = doc(db, "portfolios", auth.currentUser.uid);
            const profile = await getDoc(docRef);
            if (!profile.exists()) {
                await setDoc(docRef, {
                    uid: auth.currentUser.uid,
                    cash: 10000,
                    assets: [],
                    transactions: [],
                    joined: new Date().toUTCString(),
                    username: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                });
            }
        } catch (err) {
            console.log(err.message);
            return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        }
        toast.success("Login Successful !", toastStyle);
        navigate("/");
    };

    const handleLogin = async e => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (err) {
            return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        }
        setLoginEmail("");
        setLoginPassword("");
        toast.success("Login Successful !", toastStyle);
        navigate("/");
    };

    const userObserver = setCurrentUser => {
        onAuthStateChanged(auth, user => {
            if (user) setCurrentUser(user);
            else setCurrentUser(null);
        });
    };

    const logout = () => {
        toast.info("You Have Been Signed Out", toastStyle);
        signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                loginEmail,
                loginPassword,
                registerUsername,
                registerEmail,
                registerPassword,
                currentUser,
                forgot,
                setLoginEmail,
                setLoginPassword,
                setRegisterUsername,
                setRegisterEmail,
                setRegisterPassword,
                setForgot,
                handleLogin,
                handleRegister,
                signInProvider,
                logout,
                setCurrentUser,
                userObserver,
                forgetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
