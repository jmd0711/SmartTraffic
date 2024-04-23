import 'leaflet/dist/leaflet.css';
import '../components.css';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class Dashboard extends Component {

  handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  render() {
    const position = [37.7749, -122.4194]; // Example position for San Francisco
    const markerPosition = [37.7749, -122.4194]; // Example marker position

    return (
      <Container fluid className='main-page'>
        <Row className='h-100'>
          <Col md={3} className='side-bar p-3'>
            <h3 className="text-light mb-3">Incidents</h3>
            <Form.Control
              type="text"
              placeholder="Filter"
              className="mb-3"
            />
            {/* List of road incidents */}
            <div className='side-bar-content mb-2 p-2'>Car Crash #1</div>
            <div className='side-bar-content mb-2 p-2'>Road Work #1</div>
            <div className='side-bar-content mb-2 p-2'>Car Crash #2</div>
          </Col>
          <Col className='main-body p-3'>
            <Form className="d-flex mb-3" onSubmit={this.handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search Area"
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Search</Button>
            </Form>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={markerPosition}>
                  <Popup>
                    A marker!
                  </Popup>
                </Marker>
              </MapContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Dashboard);