import React from 'react';
import './NavBar.scss';
import { Navbar, Container, Nav } from 'react-bootstrap';
import CartWidget from '../../components/cartWidget/CartWidget'
import logo from "../../assets/img/logo-sweet-cake.png";

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="light" className="style-nav">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="logo dulce pastel"
                    />
                </Navbar.Brand>
                <Navbar.Brand href="#home" className="title-brand">Dulce pastel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">Inicio</Nav.Link>
                        <Nav.Link href="#product">Productos</Nav.Link>
                        <Nav.Link href="#we">Nosotros</Nav.Link>
                        <Nav.Link href="#contact">Contacto</Nav.Link>
                    </Nav>
                    <CartWidget/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}