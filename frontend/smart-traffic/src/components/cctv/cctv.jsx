import 'leaflet/dist/leaflet.css';
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

class CCTV extends Component {

  handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  render() {
    const position = [37.7749, -122.4194]; // Example position for San Francisco
    const markerPosition = [37.7749, -122.4194]; // Example marker position

    return (
      <Container fluid className='main-page'>
        <Row className="h-100">
          <Col md={3} className='side-bar p-3'>
            <h3 className="text-light mb-3">CCTVs</h3>
            <Form.Control
              type="text"
              placeholder="Filter"
              className="mb-3"
            />
            {/* List of CCTV cameras */}
            <div className='side-bar-content mb-2 p-2'>CCTV #1</div>
            <div className='side-bar-content mb-2 p-2'>CCTV #2</div>
            <div className='side-bar-content mb-2 p-2'>CCTV #3</div>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Add Drone
              </Button>
            </div>
          </Col>
          <Col className="main-body d-flex flex-column p-3">
            <Form className="d-flex mb-3" onSubmit={this.handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search Area or CCTV Number"
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
            <div className='device-details p-3 mt-3'>CCTV #1
              <div className="d-flex align-items-end flex-column" style={{ height: '90%' }}>
                <div className='mt-auto'>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                  <Button className="ms-2" variant="danger" type="submit">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(CCTV);