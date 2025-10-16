import React, {useEffect, createContext, useState, useContext} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {UserProfile} from "../../types/Types";
import {loginAPI, registerAPI} from "../actions/AuthService";
import {useNavigate} from "react-router-dom";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, password: string, roles: string[]) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthContextProvider = ({children}: Props)=> {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        email: string,
        password: string,
        role: string[]
    ) => {
        await registerAPI(email, password, role)
            .then((result) => {
                if (result) {
                    localStorage.setItem("token", result?.data.token);
                    const userObj = {
                        username: result?.data.username,
                        email: result?.data.email,
                        roles: result?.data.roles.map((role) => role),
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setUser(userObj!);
                    setToken(result?.data.token);
                    toast.success("User registered successfully.");
                    navigate("/productionorders");
                }
            })
            .catch((error) => toast.warning("Server error occurred"));
    }

    const loginUser = async (
        email: string,
        password: string
    ) => {
        await loginAPI(email, password)
            .then((result) => {
                if (result) {
                    console.log(result);
                    localStorage.setItem("token", result?.data.token);
                    const userObj = {
                        username: result?.data.username,
                        email: result?.data.email,
                        roles: result?.data.roles.map((role) => role),
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setUser(userObj!);
                    setToken(result?.data.token!);
                    toast.success("Login Success!");
                    navigate("/productionorders");
                }
            })
            .catch((error) => toast.warning("Login failed"));
    }

    const isLoggedIn = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser}}>
            {isReady ? children : null}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);