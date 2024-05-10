import 'leaflet/dist/leaflet.css';
import React, { Component } from 'react';
import { withRouter } from "../withrouter";
import PopupForm from './popupForm';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import L from 'leaflet';
import { fromAddress } from 'react-geocode';
import '../geocodeapi';
import MarkerClusterGroup from "react-leaflet-cluster";
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
      mode: 'add',
      itemId: null,
      showMessage1: false,
      showMessage2: false,
      mapCenter: [37.7749, -122.4194],
      showForm: false,
      admin: true,
      search: '',
      error: {},
      items: []
    };
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.onChange = this.onChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  };

  toggleForm = (mode, itemId = null) => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
      mode: mode,
      itemId: itemId
    }));
  };

  handleCloseForm = () => {
    this.setState({
      showForm: false,
      selectedItem: null // Reset currentItem
    });
  };

  componentDidMount() {
    this.fetchIotEvents();
    this.setState({admin: typeof localStorage.userToken === "string"})
  };

  fetchIotEvents = () => {
    // Fetch iot entries from the server
    fetch('http://54.215.68.185:8080/iot/getAll')
      .then(response => response.json())
      .then(data => this.setState({ items: data }))
      .catch(error => console.log('Error fetching data:', error));
  };

  handleSearch = (e) => {
    e.preventDefault();
    //console.log(this.state.search);

    fromAddress(this.state.search)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location
        const map = this.mapRef.current
        map.setView([lat, lng], map.getZoom())
      })
      .catch(console.error)
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSearchInputChange = (event) => {
    this.setState({ query: event.target.value });
  };


  handleFilter = (event) => {
    event.preventDefault();
    const { query } = this.state;

    axios.get(`http://54.215.68.185:8080/iot/search?county=${query}&id=${parseInt(query.replace( /[^\d.]/g, '' ))}`)
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
      markerPosition: [item.latitude, item.longitude]
    });
    if (map != null) {
      map.setView([item.latitude, item.longitude], map.getZoom());
    }
    
  };

  handleAddButtonClick = () => {
    this.toggleForm('add');
  };

  handleChangeButtonClick = (itemId) => {
    this.toggleForm('change', itemId);
  };

  handleFormSubmit = (formData) => {
    if (this.state.mode === 'add') {
      this.addNewInformation(formData);
    } else if (this.state.mode === 'change') {
      this.updateInformation(this.state.itemId, formData);
    }
  };

  addNewInformation = (formData) => {
    fetch('http://54.215.68.185:8080/iot/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add new information');
      }
      console.log('New information added successfully');
    })
    .catch(error => {
      console.error('Error adding new information:', error);
    });
  };

  updateInformation = (itemId, formData) => {
    fetch(`http://54.215.68.185:8080/iot/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update information');
      }
      console.log('Information updated successfully');
    })
    .catch(error => {
      console.error('Error updating information:', error);
    });
  };

  handleDelete = () => {
      const { selectedItem } = this.state;
      if (selectedItem) {
        // Delete the selected Camera entry
        axios.delete(`http://54.215.68.185:8080/iot/${selectedItem.id}`)
          .then(response => {
            // Refresh iot entries after deletion
            this.fetchIotEvents();
            this.setState({ selectedItem: null }); // Clear selected item after deletion
          })
          .catch(error => {
            console.error('Error deleting selected Camera entry:', error);
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
            <h3 className="text-light mb-3">Iots</h3>
            {/* <Form.Control
              type="text"
              placeholder="Search Area  Number"
              className="mb-3"
              value={this.state.query}
              onChange={this.handleSearchInputChange}
            /> */}
            <Form className="d-flex mb-3" onSubmit={this.handleFilter}>
              <Form.Control
                type="text"
                placeholder="Station Number/Name"
                value={this.state.query}
                onChange={this.handleSearchInputChange}
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Filter</Button>
            </Form>
            {/* List of Stations */}
            <div style={{ maxHeight: '600px', overflowY: 'auto', marginBottom: '15px'}}>
            {items.map(item => (
              <div className='side-bar-content mb-2 p-2' key={item.id} onClick={() => this.handleItemClick(item)}>
              Station#{item.id}
              </div>
            ))}
            </div>
            {this.state.showMessage1 && <p style={{ color: 'white' }}>Camera Successfully Added!</p>}
            <div className="d-flex justify-content-end">
              {admin && <Button onClick={this.handleAddButtonClick} variant="primary" type="submit" style={{ maxHeight: '400px', overflowY: 'auto'}}>
                Add Camera
              </Button>}
              {!admin && null}
            </div>
          </Col>
          <Col className="main-body d-flex flex-column p-3">
            <Form className="d-flex mb-3" onSubmit={this.handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search County"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Search</Button>
            </Form>
            {this.state.showForm && <PopupForm mode={this.state.mode} onSubmit={this.handleFormSubmit} onClose={this.handleCloseForm} />}
            <MapContainer center={mapCenter} zoom={13} ref={this.mapRef}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup>
                {items.map(marker => (
                  <Marker key={marker.id} position={[marker.latitude, marker.longitude]} >
                    {/* onClick={() => this.handleItemClick(marker)} */}
                    <Popup>
                      Station#{marker.id}. <br /> County: {marker.county} <br /> Latitude: {marker.latitude}, Longitude: {marker.longitude}.
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
              
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
                    <Button onClick={() => this.handleChangeButtonClick(selectedItem.id)} variant="primary" type="submit">
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
