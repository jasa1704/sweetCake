import React from 'react';
import './NavBar.scss';
import { Navbar, Container, Nav } from 'react-bootstrap';
import CartWidget from './cartWidget/CartWidget'
import logo from "../../assets/img/logo/logo-sweet-cake.png";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="light" className="style-nav">
            <Container>
                <Navbar.Brand as={Link} to="/home">
                    <img
                        src={logo}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="logo dulce pastel"
                    />
                </Navbar.Brand>
                <Navbar.Brand className="title-brand">Dulce pastel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/products">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/we">Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                    </Nav>
                    <CartWidget/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}