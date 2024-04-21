import React, { useState, useEffect } from "react"
import { Container, Row, Col, Stack, InputGroup, Form, Button } from "react-bootstrap"
import { Component } from "react"
import { withRouter } from "../withrouter"
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import "./dashboard.css"
import * as L from "leaflet";

class Dashboard extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="main-page">
        <Container>
          {/*<h3 className="page-header"> DASHBOARD PAGE </h3>*/}
          <Row className="justify-content-center page-container">

            <Col xs={4} className="section sidebar">
              <h1>Incidents</h1>
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
            </Col>
            <Col className="d-flex flex-column">
              <Row className="section map justify-content-center p-2">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="primary" id="button-addon2">
                    Search
                  </Button>
                  <MapContainer center={[37.7749, -122.4194]} zoom={12} scrollWheelZoom={false}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </MapContainer>
                </InputGroup>
              </Row>
              <Row className="section p-2">
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
    )
  }
}

export default withRouter(Dashboard);