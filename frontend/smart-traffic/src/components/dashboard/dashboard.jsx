import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Component } from "react"
import { withRouter } from "../withrouter"

class Dashboard extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Container fluid className="page-container">
        {/*<h3 className="page-header"> DASHBOARD PAGE </h3>*/}
        <Row>
          <Col xs={3} id="sidebar-wrapper">
            <Row>
              Issue 1
            </Row>
            <Row>
              Issue 2
            </Row>
            <Row>
              Issue 3
            </Row>
          </Col>
          <Col xs={9}>
            <Row>
              Map
            </Row>
            <Row>
              <Col>
                Stat1
              </Col>
              <Col>
                Stat2
              </Col>
              <Col>
                Stat3
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>
    )
  }
}

export default withRouter(Dashboard);