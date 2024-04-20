import React, { Component } from 'react'
import { withRouter } from '../withrouter'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '', 
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
    }

    render() {
        return (
            <div className="container">
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 id="title">Register</h1>
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            name="username" 
                            placeholder="Username" 
                            value={this.state.username}
                            onChange={this.onChange}/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        <label htmlFor="floatingInput">Email</label>
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
                    <div className="d-flex align-items-center mb-3">
                        <div className="d-flex justify-content-end flex-grow-1">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Register)