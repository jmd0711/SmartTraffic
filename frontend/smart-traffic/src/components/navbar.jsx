import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from './withrouter'
import { Container, Nav, Navbar } from "react-bootstrap"

class NavBar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('userToken')
    this.props.navigate('/login')
    window.location.reload()
  }
  render() {
    const loginRegisterLink = (
      <Nav variant="underline">
        <Nav.Link href="/login">Log In</Nav.Link>
        <Nav.Link href="/register">Sign Up</Nav.Link>
      </Nav>
    )

    const userLink = (
      <div>
        <Nav variant="underline">
          <Nav.Link href="/cctv">CCTV</Nav.Link>
          <Nav.Link href="/drone">Drone</Nav.Link>
          <Nav.Link href="/iot">IoT</Nav.Link>
          <Nav.Link href="/" onClick={this.logOut.bind(this)}>Logout</Nav.Link>
        </Nav>
      </div>
    )

    return (
      <Navbar bg="navbar-color" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Smart Traffic</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {typeof localStorage.userToken === "string" ? userLink : loginRegisterLink}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default withRouter(NavBar)