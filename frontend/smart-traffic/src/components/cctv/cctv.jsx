import React, { useState, useEffect } from "react"
import { Component } from "react"
import { withRouter } from "../withrouter"
import { Container, Row, Col, Stack, InputGroup, Form, Button } from "react-bootstrap"

class CCTV extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="main-page">
        <Container>
          {/*<h3 className="page-header"> CCTV PAGE </h3>*/}
          <Row className="justify-content-center">

            <Col xs={4} className="section sidebar">
              <h1>CCTVs</h1>
              <Form.Control
                placeholder="Filter"
                aria-label="Filter"
                aria-describedby="basic-addon2"
              />
              <Stack gap={3}>
                <div className="p-2">First item</div>
                <div className="p-2">Second item</div>
                <div className="p-2">Third item</div>
              </Stack>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Add CCTV
                </Button>
              </div>
            </Col>
            <Col>
              <Row className="section map justify-content-center">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="primary" id="button-addon2">
                    Search
                  </Button>
                </InputGroup>
                Map
              </Row>
              <Row className="section">
                <Stack direction="horizontal" gap={3} className="justify-content-md-center">
                  <div className="p-2">First item</div>
                  <div className="p-2">Second item</div>
                  <div className="p-2">Third item</div>
                </Stack>
              </Row>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default withRouter(CCTV)