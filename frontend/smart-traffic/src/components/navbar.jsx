import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from './withrouter'
import { Container, Nav, Navbar } from "react-bootstrap"
import './components.css'

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
        <Nav.Link href="/login" style={{color: "white",}}>Log In</Nav.Link>
        <Nav.Link href="/register" style={{color: "white",}}>Sign Up</Nav.Link>
      </Nav>
    )

    const userLink = (
      <div>
        <Nav variant="underline">
          <Nav.Link href="/cctv" style={{color: "white",}}>CCTV</Nav.Link>
          <Nav.Link href="/drone" style={{color: "white",}}>Drone</Nav.Link>
          <Nav.Link href="/iot" style={{color: "white",}}>IoT</Nav.Link>
          <Nav.Link href="/" style={{color: "white",}} onClick={this.logOut.bind(this)}>Log Out</Nav.Link>
        </Nav>
      </div>
    )

    return (
      <Navbar bg="navbar-color" data-bs-theme="dark" className="px-3">
          <Navbar.Brand href="/" style={{fontWeight: "bold",}}>Smart Traffic</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {typeof localStorage.userToken === "string" ? userLink : loginRegisterLink}
          </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(NavBar)