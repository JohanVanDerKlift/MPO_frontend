import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import {useAuth} from "./context/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
import Login from './components/Login';
import ProductionorderList from "./pages/ProductionorderList/ProductionorderList";
import Productionorder from "./pages/Productionorder/Productionorder";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";

function App() {
    const {user} = useAuth();
    console.log(user);

    return (
        <>
            <NavBar/>
            <Container>
                <Routes>
                    <Route path="" element={<HomePage />}/>
                    <Route path="/productionorders" element={user ? <ProductionorderList /> : <Login />}/>
                    <Route path="/productionorder/:id/:type" element={user ? <Productionorder /> : <Login />}/>
                    <Route path="/account/login" element={<Login />}/>
                    <Route path="/account/register" element={<Register />}/>
                    <Route path="/account/reset-password" element={<PasswordReset />}/>
                </Routes>
                <ToastContainer position="bottom-left" autoClose={3000} />
            </Container>
        </>
    );
}

export default App;
