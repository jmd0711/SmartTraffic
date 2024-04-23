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

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      selectedItem: null,
      markerPosition: null,
      items: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/cctv/getAll')
      .then(response => response.json())
      .then(data => this.setState({ items: data }))
      .catch(error => console.log('Error fetching data:', error));
  }

  handleItemClick = (item) => {
    const map = this.mapRef.current;
    this.setState({selectedItem: item});
    this.setState({ markerPosition: [item.latitude, item.longitude] });
    const bounds = map.getBounds().extend([item.latitude, item.longitude]);
    map.fitBounds(bounds);
  }

  render() {
    // const position = [37.7749, -122.4194]; // Example position for San Francisco
    // const markerPosition = [37.7749, -122.4194]; // Example marker position
    const {items, selectedItem, markerPosition} = this.state;

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
            {items.slice(0, 8).map(item => (
              <div className='side-bar-content mb-2 p-2' key={item.id} onClick={() => this.handleItemClick(item)}>
                CCTV{item.id}
              </div>
            ))}
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Add CCTV
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
            <MapContainer center={[37.7749, -122.4194]} zoom={13} onClick={this.handleClick} ref={this.mapRef}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerPosition && ( // Render Marker only if position is defined
                <Marker position={markerPosition}>
                  <Popup>
                    CCTV <br />
                  </Popup>
                </Marker>
              )}
            </MapContainer>
            <div className='device-details p-3 mt-3'>
              {selectedItem ? (
                <div> 
                  <h5>CCTV#{selectedItem.id} Details</h5>
                  <p>Address:{selectedItem.locationName}</p>
                  <p>Latitude, Longitude: {selectedItem.latitude}, {selectedItem.longitude}</p>
                  <p>In Service: {selectedItem.inService}</p>
                  <p>Video URL: <a href={selectedItem.videoUrl} target="_blank" rel="noopener noreferrer">{selectedItem.videoUrl}</a></p>
                  <img src={selectedItem.imageUrl} alt="Item" height="150"/>
                </div>
              ) : (
                <p>Please select a CCTV to view information</p>
              )}

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