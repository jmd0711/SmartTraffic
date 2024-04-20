import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from './withrouter'

class NavBar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('userToken')
        this.props.navigate('/login')
        window.location.reload()
    }
    render() {
        const loginRegisterLink = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/cctv" className="nav-link">CCTV</Link>
                </li>
                <li className="nav-item">
                    <Link to="/drone" className="nav-link">Drone</Link>
                </li>
                <li className="nav-item">
                    <Link to="/iot" className="nav-link">IoT</Link>
                </li>
                <li className="nav-item">
                    <Link to="" className="nav-link" onClick={this.logOut.bind(this)}>Logout</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <div className="mx-auto order-0">
                    <a className="navbar-brand mx-auto" href="/">Smart Traffic</a>
                </div>        
                <div className="navbar-collapse collapse order-3">
                    {typeof localStorage.userToken === "string" ? userLink : loginRegisterLink}
                </div>      
            </nav>
        )
    }
}

export default withRouter(NavBar)