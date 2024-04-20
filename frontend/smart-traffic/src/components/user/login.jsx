import React, { Component } from 'react'
import { withRouter } from '../withrouter'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            error: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        //Temporary login
        localStorage.setItem("userToken", this.state.username)
        this.props.navigate('/')
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1 id="title">Log in</h1>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                            <label htmlFor="floatingInput">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            <label htmlFor="floatingInput">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)