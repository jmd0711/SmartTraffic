import React, { Component } from 'react'
import { withRouter } from '../withrouter'
import { Button, Container, Form, FloatingLabel } from "react-bootstrap"

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
    console.log(this.state.username)
    localStorage.setItem("userToken", this.state.username)
    this.props.navigate('/')
  }

  render() {
    return (
      <div className="main-page">
        <Container className="section user-container w-50">
            <h1>Log In</h1>
            <Form onSubmit={this.onSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </FloatingLabel>
              <div className="d-flex justify-content-end flex-grow-1">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
        </Container>
      </div>
    )
  }
}

export default withRouter(Login)