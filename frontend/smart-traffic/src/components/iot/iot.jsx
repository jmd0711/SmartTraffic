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
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class IOT extends Component {

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      selectedItem: null,
      markerPosition: null,
      showMessage1: false,
      showMessage2: false,
      mapCenter: [37.7749, -122.4194],
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
    this.fetchIotEvents();
  }
  

  fetchIotEvents = () => {
    // Fetch IotEvents entries from the server
    fetch('http://localhost:8080/iot/getAll') 
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
  
    axios.get(`http://localhost:8080/iot/search?county=${query}&id=${parseInt(query.replace(/[^\d.]/g, ''))}`)
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
        // Delete the selected IotEvent entry
        axios.delete(`http://localhost:8080/iot/${selectedItem.id}`)
          .then(response => {
            // Refresh IotEvent entries after deletion
            this.fetchIotEvents();
            this.setState({ selectedItem: null }); // Clear selected item after deletion
          })
          .catch(error => {
            console.error('Error deleting selected Station entry:', error);
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
        <Row className="h-100" style={{ maxHeight: '600px'}}>
          <Col md={3} className='side-bar p-3'>
            <h3 className="text-light mb-3">IOTs</h3>
            <Form.Control
              type="text"
              placeholder="Search Station Number"
              className="mb-3"
            />
            
            <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '15px'}}>
            {items.map(item => (
              <div className='side-bar-content mb-2 p-2' key={item.id} onClick={() => this.handleItemClick(item)}>
                Station#{item.id}
              </div>
            ))}
            </div>
            {this.state.showMessage1 && <p style={{ color: 'white' }}>Station Successfully Added!</p>}
            <div className="d-flex justify-content-end">
              {admin && <Button onClick={this.toggleForm} variant="primary" type="submit" style={{ maxHeight: '400px', overflowY: 'auto'}}>
                Add Station
              </Button>}
              {!admin && null}
            </div>
          </Col>
          <Col className="main-body d-flex flex-column p-3">
            <Form className="d-flex mb-3" onSubmit={this.handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search County"
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
                    Station <br />
                  </Popup>
                </Marker>
              )}
              {/* {this.state.showForm && <PopupForm />} */}
            </MapContainer>
            <div className='mt-auto'>
            <div className='device-details p-3 mt-3'>
              {selectedItem ? (
                <div> 
                  <h5>Camera#{selectedItem.id} Details</h5>
                  <p>District: {selectedItem.district}</p>
                  <p>County: {selectedItem.county}</p>
                  <p>Latitude, Longitude: {selectedItem.latitude}, {selectedItem.longitude}</p>
                  <p>Elevation: {selectedItem.elevation}</p>
                  <p>Postmile: {selectedItem.postmile}</p>
                  <p>Inservice: {selectedItem.inService}</p>
                   
                 
                  {this.state.showMessage2 && <p style={{ color: 'black' }}>Station#{selectedItem.id} Successfully Deleted!</p>}
                </div>
              ) : (
                <p>Please select a Station to view information</p>
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

export default withRouter(IOT);