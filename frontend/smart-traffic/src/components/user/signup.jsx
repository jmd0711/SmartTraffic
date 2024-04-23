import React, { Component } from 'react'
import { withRouter } from '../withrouter'
import { Button, Container, Form, FloatingLabel } from "react-bootstrap"
import { signup } from './userapi'

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
    e.preventDefault()
    if (this.state.username === '' ||
      this.state.password === '' ||
      this.state.email === '') {
      window.alert("Please fill in all the fields.")
    } else {
      const newUser = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      }

      signup(newUser).then(res => {
        if (typeof res !== 'object') {
          localStorage.clear()
          window.location.reload()
        } else {
          this.props.navigate('/')
        }
      })
    }
  }

render() {
  return (
    <Container fluid className='main-page'>
      <div className='auth-body h-100 py-3 px-5'>
        <h3 className="text-light mb-3">Sign Up</h3>
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
            label="Email"
            className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
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
      </div>
    </Container>
  )
}
}

export default withRouter(Register)