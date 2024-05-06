import 'leaflet/dist/leaflet.css';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";
import PopupForm from './popupForm';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('./smart-drone.png'),
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
      showMessage1: false,
      showMessage2: false,
      mapCenter: [37.334665328, -121.875329832],
      showForm: false,
      admin: true,
      items: []
    };
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  componentDidMount() {
    this.fetchDroneEntries();
  }

  fetchDroneEntries = () => {
    // Fetch Drone entries from the server
    fetch('http://localhost:8080/drone/getAll')
      .then(response => response.json())
      .then(data => this.setState({ items: data }))
      .catch(error => console.log('Error fetching data:', error));
  };


  handleSearchInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { query } = this.state;

    axios.get(`http://localhost:8080/drone/search?locationName=${query}&id=${parseInt(query.replace( /[^\d.]/g, '' ))}`)
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };


  handleItemClick = (item) => {
    const map = this.mapRef.current;
    this.setState({selectedItem: item, 
      mapCenter: [item.latitude, item.longitude], 
      markerPosition: [item.latitude, item.longitude]
    });
    const bounds = map.getBounds().extend([item.latitude, item.longitude]);
    map.fitBounds(bounds);
  }

  handleAddButtonClick = () => {
    this.setState({ showMessage1: true });
    setTimeout(() => {
      this.setState({ showMessage1: false });
    }, 5000); // 10 seconds
    // setShowPopup(true);
  };

  handleDelete = () => {
      const { selectedItem } = this.state;
      if (selectedItem) {
        // Delete the selected drone entry
        axios.delete(`http://localhost:8080/drone/${selectedItem.id}`)
          .then(response => {
            // Refresh Drone entries after deletion
            this.fetchDroneEntries();
            this.setState({ selectedItem: null }); // Clear selected item after deletion
          })
          .catch(error => {
            console.error('Error deleting selected Drone entry:', error);
          });
          this.setState({ showMessage2: true });
          setTimeout(() => {
            this.setState({ showMessage2: false });
          }, 5000);
      }
  };

  render() {
    // const position = [37.7749, -122.4194]; // Example position for San Francisco
    // const markerPosition = [37.7749, -122.4194]; // Example marker position
    const {items, selectedItem, markerPosition, admin, mapCenter} = this.state;
    

    return (
      <Container fluid className='main-page'>
        <Row className="h-100" style={{ maxHeight: '500px'}}>
          <Col md={3} className='side-bar p-3'>
            <h3 className="text-light mb-3">Drones</h3>
            <Form.Control
              type="text"
              placeholder="Filter"
              className="mb-3"
            />
            {/* List of Drone cameras */}
            <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '15px'}}>
            {items.map(item => (
              <div className='side-bar-content mb-2 p-2' key={item.id} onClick={() => this.handleItemClick(item)}>
                Drone #{item.id}
              </div>
            ))}
            </div>
            {this.state.showMessage1 && <p style={{ color: 'white' }}>Drone Successfully Added!</p>}
            <div className="d-flex justify-content-end">
              {admin && <Button onClick={this.toggleForm} variant="primary" type="submit" style={{ maxHeight: '400px', overflowY: 'auto'}}>
                Add Drone
              </Button>}
              {!admin && null}
            </div>
          </Col>
          <Col className="main-body d-flex flex-column p-3">
            <Form className="d-flex mb-3" onSubmit={this.handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search Drone ID"
                value={this.state.query}
                onChange={this.handleSearchInputChange}
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Search</Button>
            </Form>
            {this.state.showForm && <PopupForm />}
            <MapContainer center={mapCenter} zoom={13}  ref={this.mapRef}>
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
              {/* {this.state.showForm && <PopupForm />} */}
            </MapContainer>
            <div className='mt-auto'>
            <div className='device-details p-3 mt-3'>
              {selectedItem ? (
                <div> 
                  <h5>Drone #{selectedItem.id} Details</h5>
                  <p>Address: {selectedItem.locationName}</p>
                  <p>Latitude, Longitude: {selectedItem.latitude}, {selectedItem.longitude}</p>
                  <p>In Service: {selectedItem.inService}</p>
                  <p>Video URL: <iframe width="560" height="315" src={selectedItem.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>
                  <img src={selectedItem.imageUrl} alt="Item" height="150"/>
                  {this.state.showMessage2 && <p style={{ color: 'black' }}>Drone #{selectedItem.id} Successfully Deleted!</p>}
                </div>
              ) : (
                <p>Please select a Drone to view information</p>
              )}

              <div className="d-flex align-items-end flex-column" style={{ height: '90%' }}>
                <div className='mt-auto'>
                {admin && 
                  <div>
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                    <Button onClick={this.handleDelete} className="ms-2" variant="danger" type="submit">
                      Delete
                    </Button>
                  </div>}
                {!admin && null}
              </div>
            </div>
            </div>
          </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Drone);



//<a href="https://www.flaticon.com/free-icons/smart-drone" title="smart-drone icons">Smart-drone icons created by Flat Icons - Flaticon</a>