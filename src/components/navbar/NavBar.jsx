import React from 'react';
import './NavBar.scss';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import CartWidget from './cartWidget/CartWidget'
import logo from "../../assets/img/logo/logo-sweet-cake.png";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="light" className="style-nav">
            <Container>
                <Navbar.Brand as={Link} to="/products">
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
                        <Nav.Link as={Link} to="/products">Tienda</Nav.Link>
                        <NavDropdown title="Categorias" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/product-category/loveFriendship">Amor y amistad</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/product-category/valentineDay">San Valentin</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/product-category/films">Peliculas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/product-category/childish">Infantil</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/cart"> <CartWidget/> </Nav.Link>
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}