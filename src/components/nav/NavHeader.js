import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {
  Link
} from "react-router-dom";

function NavHeader() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">My Project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/compliance" >Compliance</Nav.Link>
                <Nav.Link as={Link} to="/license" >License</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary"><i className="fas fa-search"></i></Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavHeader;

