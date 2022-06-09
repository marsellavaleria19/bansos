import React from 'react';
import { Navbar,Nav,Container } from 'react-bootstrap';

const CNavbar = ()=>{
   return (
      <Navbar bg="light" expand="lg">
         <Container>
            <Navbar.Brand href="#home">Data Bansos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default CNavbar;