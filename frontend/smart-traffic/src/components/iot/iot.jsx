import 'leaflet/dist/leaflet.css';
import React, { Component } from 'react';
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

class Drone extends Component {

  handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  render() {
    const position = [37.7749, -122.4194]; // Example position for San Francisco
    const markerPosition = [37.7749, -122.4194]; // Example marker position

    return (
      <div className="main-page" style={{ height: '100vh', backgroundColor: '#2B3E50' }}>
        <Navbar style={{ backgroundColor: '#2B3E50' }} variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home" style={{ color: '#FFFFFF' }}>Traffic AI</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* Left aligned items (optional) */}
              </Nav>
              <Nav>
                
                <NavDropdown title="Management" id="basic-nav-dropdown" style={{ color: '#FFFFFF' }}>
                  <NavDropdown.Item href="#add">ADD</NavDropdown.Item>
                  <NavDropdown.Item href="#update">UPDATE</NavDropdown.Item>
                  <NavDropdown.Item href="#delete">DELETE</NavDropdown.Item>
                  <NavDropdown.Item href="#retrieve">RETRIEVE</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#prediction" style={{ color: '#FFFFFF' }}>Predictions</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid style={{ height: 'calc(100% - 56px)' }}>
          <Row className="h-100">
            <Col xs={12} md={3} style={{ backgroundColor: '#354A60' }}>
              <div className="p-3">
                <h3 className="text-light mb-3">Iot Stations</h3>
                <Form.Control
                  type="text"
                  placeholder="Filter"
                  className="mb-3"
                />
                {/* List of drone cameras */}
                <div style={{ backgroundColor: '#ADD8E6', color: '#000000', padding: '8px', marginBottom: '8px' }}>Station #1</div>
                <div style={{ backgroundColor: '#ADD8E6', color: '#000000', padding: '8px', marginBottom: '8px' }}>Station #2</div>
                <div style={{ backgroundColor: '#ADD8E6', color: '#000000', padding: '8px', marginBottom: '8px' }}>Station #3</div>
            
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

export default withRouter(Drone);