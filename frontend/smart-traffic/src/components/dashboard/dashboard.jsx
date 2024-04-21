import React, { useState, useEffect } from "react"
import { Container, Row, Col, Stack } from "react-bootstrap"
import { Component } from "react"
import { withRouter } from "../withrouter"

import "./dashboard.css"

class Dashboard extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="main-page">
        <Container>
          {/*<h3 className="page-header"> DASHBOARD PAGE </h3>*/}
          <Row className="justify-content-center">
            <Col xs={3} className="section">
              <Stack gap={3}>
                <div className="p-2">First item</div>
                <div className="p-2">Second item</div>
                <div className="p-2">Third item</div>
              </Stack>
            </Col>
            <Col>
              <Row className="section map justify-content-center">Map</Row>
              <Row>
              <Stack direction="horizontal" gap={3} className="section justify-content-md-center">
                <div className="p-2">First item</div>
                <div className="p-2">Second item</div>
                <div className="p-2">Third item</div>
              </Stack>
              </Row>
            </Col>
          </Row>

        </Container>
      </div>
    )
  }
}

export default withRouter(Dashboard);