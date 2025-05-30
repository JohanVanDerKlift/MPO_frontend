import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAuth} from "../context/AuthContext";
import {Button} from "react-bootstrap";

function NavBar() {
    const user = localStorage.getItem("user");
    const {logout} = useAuth();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Maas Productie Orders</Navbar.Brand>
                <Nav>
                    <div>
                        {user && <Nav.Link href="/productionorders">List</Nav.Link>}
                    </div>
                    <div>
                        {!user && <Nav.Link href="/account/login">Login</Nav.Link>}
                        {user && <Button variant="primary" onClick={logout}>Logout</Button>}
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;