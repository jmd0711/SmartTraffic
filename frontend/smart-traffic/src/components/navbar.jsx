import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from './withrouter'

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <div className="mx-auto order-0">
                    <a className="navbar-brand mx-auto" href="/">Smart Traffic</a>
                </div>              
            </nav>
        )
    }
}

export default withRouter(NavBar)