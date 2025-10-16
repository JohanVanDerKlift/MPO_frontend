import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import {useAuth} from "../context/AuthContext";
import maasCPSlogo from "../images/maas_logo-transparant.png";
import Search from "./Search";

function NavBar() {
    const {logout, user} = useAuth();
    const location = useLocation();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="d-flex align-items-center">
                <img src={maasCPSlogo} alt="Maas CPS Logo" />

                <div className="flex-grow-1 mx-3">
                    { location.pathname === "/productionorders" && <Search /> }
                </div>

                <Nav className="d-flex align-items-center">
                    {user ? (
                        <NavDropdown title={user?.email} id="user-nav-dropdown">
                            <NavDropdown.Item href="/productionorders">Productieorders</NavDropdown.Item>
                            {user?.roles.includes("Admin") && (
                                <NavDropdown.Item href="/account/register">Registreer gebruiker</NavDropdown.Item>
                            )}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Afmelden</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav.Link href="/account/login">Login</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;