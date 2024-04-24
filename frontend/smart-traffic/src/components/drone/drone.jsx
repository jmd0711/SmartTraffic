import 'leaflet/dist/leaflet.css';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";
// import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('./smart-drone.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class Drone extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      selectedItem: null,
      markerPosition: null,
      query: '',
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/drone/getAll')
      .then(response => response.json())
      .then(data => this.setState({ items: data }))
      .catch(error => console.log('Error fetching data:', error));
  }


  // handleSearchInputChange = (event) => {
  //   this.setState({ query: event.target.value });
  // };

  // handleSearch = (event) => {
  //   event.preventDefault();
  //   const { query } = this.state;

  //   axios.get(`http://localhost:8080/drone/search?locationName=${query}&id=${parseInt(query.replace( /[^\d.]/g, '' ))}`)
  //     .then(response => {
  //       this.setState({ items: response.data });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching search results:', error);
  //     });
  // };


  handleItemClick = (item) => {
    const map = this.mapRef.current;
    this.setState({selectedItem: item});
    this.setState({ markerPosition: [item.latitude, item.longitude] });
    const bounds = map.getBounds().extend([item.latitude, item.longitude]);
    map.fitBounds(bounds);
  }

  render() {

    const {items, selectedItem, markerPosition, query} = this.state;
    

    return (
      <Container fluid className='main-page'>
        <Row className="h-100">
          <Col md={3} className='side-bar p-3'>
            <h3 className="text-light mb-3">Drones</h3>
            <Form.Control
              type="text"
              placeholder="Filter"
              className="mb-3"
            />
            {/* List of drone cameras */}
            {items.slice(0, 5).map(item => (
              <div className='side-bar-content mb-2 p-2' key={item.id} onClick={() => this.handleItemClick(item)}>
              Drone #{item.id}
              </div>
            ))}
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
                placeholder="Search Area or Drone Id"
                // value={this.state.query}
                // onChange={this.handleSearchInputChange}
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Search</Button>
            </Form>
            <MapContainer center={[37.334665328, -121.875329832]} zoom={13} onClick={this.handleClick} ref={this.mapRef}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerPosition && ( // Render Marker only if position is defined
                <Marker position={markerPosition}>
                  <Popup>
                    Drone <br />
                  </Popup>
                </Marker>
              )}
            </MapContainer>
            <div className='device-details p-3 mt-3'>
            <div className="d-flex align-items-end flex-column" style={{ height: '90%' }}>

              {selectedItem ? (
                <div> 
                  <h5>Drone #{selectedItem.id} Details</h5>
                  <p>Address: {selectedItem.locationName}</p>
                  <p>Latitude, Longitude: {selectedItem.latitude}, {selectedItem.longitude}</p>
                  <p>In Service: {selectedItem.inService}</p>
                  <p>Video URL: <iframe width="560" height="315" src={selectedItem.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>

                  <img src={selectedItem.imageUrl} alt="Item" height="150"/>
                </div>
              ) : (
                <p>Please select a Drone to view information</p>
              )}

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

export default withRouter(Drone)


//<a href="https://www.flaticon.com/free-icons/smart-drone" title="smart-drone icons">Smart-drone icons created by Flat Icons - Flaticon</a>