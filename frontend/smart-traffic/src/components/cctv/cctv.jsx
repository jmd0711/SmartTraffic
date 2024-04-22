import 'leaflet/dist/leaflet.css';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class CCTV extends Component {

  handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  render() {
    const position = [37.7749, -122.4194]; // Example position for San Francisco
    const markerPosition = [37.7749, -122.4194]; // Example marker position

    return (
      <div className="main-page" style={{ height: '100vh', backgroundColor: '#2B3E50' }}>
        <Container fluid style={{ height: 'calc(100% - 56px)' }}>
          <Row className="h-100">
            <Col xs={12} md={3} style={{ backgroundColor: '#354A60' }}>
              <div className="p-3">
                <h3 className="text-light mb-3">CCTV</h3>
                <Form.Control
                  type="text"
                  placeholder="Filter"
                  className="mb-3"
                />
                {/* List of CCTV cameras */}
                <div style={{ backgroundColor: '#ADD8E6', color: '#000000', padding: '8px', marginBottom: '8px' }}>CCTV #1</div>
                <div style={{ backgroundColor: '#ADD8E6', color: '#000000', padding: '8px', marginBottom: '8px' }}>CCTV #2</div>
                <div style={{ backgroundColor: '#ADD8E6', color: '#000000', padding: '8px', marginBottom: '8px' }}>CCTV #3</div>
            
              </div>
            </Col>
            <Col xs={12} md={9} className="p-3" style={{ overflowY: 'auto' }}>
              <Form className="mb-3 d-flex" onSubmit={this.handleSearch}>
                <Form.Control
                  type="text"
                  placeholder="Search Area or CCTV Number"
                  className="me-2"
                  style={{ flexGrow: 1 }}
                />
                <Button type="submit" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Search</Button>
              </Form>
              <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '65%', width: '100%' }}>
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
      </div>
    );
  }
}

export default withRouter(CCTV);