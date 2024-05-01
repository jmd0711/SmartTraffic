import 'leaflet/dist/leaflet.css';
import '../components.css';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import L from 'leaflet';
import BarChart from './barchart'
import LineChart from './linechart';
import RadialBarChart from './radialbar'
import StreamChart from './streamchart'
import '../geocodeapi';
import './eventapi';
import { fromAddress } from 'react-geocode';
import { getEvents } from './eventapi';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class Dashboard extends Component {
  constructor() {
    super()
    this.mapRef = React.createRef();
    this.state = {
      search: '',
      selectedItem: null,
      markerPosition: null,
      mapCenter: [37.3346, -121.8753],
      items: [],
      error: {}
    }

    this.onChange = this.onChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

  }

  componentDidMount() {
    this.getEventData();
  }

  getEventData = async () => {
    let data = [];
    data = await getEvents();
    this.setState({ items: data })
  }

  handleItemClick = (item) => {
    const map =this.mapRef.current;
    this.setState({selectedItem: item,
      markerPosition: [item.latitude, item.longitude]
    })
    map.setView([item.latitude, item.longitude], map.getZoom())
  }

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

  render() {
    const {items, selectedItem, markerPosition, mapCenter} = this.state;
    return (
      <Container fluid className='main-page'>
        <Row className='h-100'>
          <Col md={3} className='side-bar p-3 ms-3 me-0'>
            <h3 className="text-light mb-3">Events</h3>
            <Form.Control
              type="text"
              placeholder="Filter"
              className="mb-3"
            />
            {/* List of road incidents */}
            <Accordion style={{ overflowY: 'auto', marginBottom: '15px' }}>
              {items.map(item => (
                <Accordion.Item eventKey={item.id} className='side-bar-content mb-2 p-2' key={item.id} onClick={() => this.handleItemClick(item)}>
                  <Accordion.Header>{item.eventType}#{item.id}</Accordion.Header>
                  <Accordion.Body>{item.headline}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col className='main-body d-flex flex-column p-3 ms-3 me-0'>
            <Form className="d-flex mb-3" onSubmit={this.handleSearch}>
              <Form.Control
                type="text"
                name="search"
                placeholder="Search Area"
                value={this.state.search}
                onChange={this.onChange}
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Search</Button>
            </Form>
            <MapContainer center={mapCenter} zoom={13} ref={this.mapRef}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {items.map(item => (
                <Marker position={[item.latitude, item.longitude]}>
                <Popup>
                  {item.subType}
                </Popup>
              </Marker>
              ))}
            </MapContainer>
            <div className='device-details mt-3'>
              <LineChart />
            </div>
          </Col>
          <Col md={3} className='side-bar d-flex flex-column p-3 ms-3 me-3'>
            <div className='device-details mt-3'>
              <RadialBarChart />
            </div>
            <div className='device-details mt-3'>
              <StreamChart />
            </div>
            <div className='device-details mt-3'>
              <BarChart />
            </div>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default withRouter(Dashboard);