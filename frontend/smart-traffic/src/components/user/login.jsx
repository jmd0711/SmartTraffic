import '../components.css'
import React, { Component } from 'react'
import { withRouter } from '../withrouter'
import { Button, Container, Form, FloatingLabel } from "react-bootstrap"
import { login } from './userapi'

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
    // Temporary login
    // console.log(this.state.username)
    // localStorage.setItem("userToken", this.state.username)
    // this.props.navigate('/')

    // Real Login
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    login(user).then(res => {
      if (this.state.username === '' || this.state.password === '') {
        window.alert("Please fill all the fields!")
      } else if (!res) {
        window.alert("Account not found! Please try again.")
        localStorage.clear()
        window.location.reload()
      } else {
        this.props.navigate(`/`)
      }
    })
  }

  render() {
    return (
      <Container fluid className='main-page'>
        <div className='auth-body h-100 py-3 px-5'>
          <h3 className="text-light mb-3">Log In</h3>
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
        </div>
      </Container>
    )
  }
}

export default withRouter(Login)