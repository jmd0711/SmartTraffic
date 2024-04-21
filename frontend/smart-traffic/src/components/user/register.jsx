import React, { Component } from 'react';
import { withRouter } from '../withrouter';
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        error: {}
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // Implement your registration logic here
        // For example: apiCall.register(this.state).then(() => this.props.navigate('/login'));
        console.log('Registration details:', this.state); // Placeholder for demonstration
        this.props.navigate('/login'); // Redirect to login page after registration
    };

    render() {
        const buttonStyle = {
            backgroundColor: '#007bff', // Replace with your actual color code
            color: 'white',
            width: '100%',
            height: '50px'
        };

        const fullHeightStyle = {
            height: '70vh',
        };

        return (
            <div className="container" style={fullHeightStyle}>
                <div className="row justify-content-center align-items-center" style={fullHeightStyle}>
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Register for Smart Traffic</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            placeholder="Enter username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Enter password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn" style={buttonStyle}>
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
