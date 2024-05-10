import 'leaflet/dist/leaflet.css';
import '../components.css';
import React, { Component } from 'react';
import { withRouter } from "../withrouter";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import L from 'leaflet';
import BarChart from './barchart'
import LineChart from './linechart';
import RadialBarChart from './radialbar'
import StreamChart from './streamchart'
import '../geocodeapi';
import './eventapi';
import { fromAddress } from 'react-geocode';
import { getCCTVs, getDrones, getEvents, getIoTs, searchEvents } from './eventapi';
import MarkerClusterGroup from 'react-leaflet-cluster';
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
      severityData: [],
      serviceData: [],
      error: {}
    }

    this.onChange = this.onChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

  }

  componentDidMount() {
    this.getEventData();
    this.getDeviceData();
  }

  getEventData = async () => {
    let data = [];
    data = await getEvents();
    this.setState({ items: data })
    const unknown = data.reduce((acc, cur) => cur.severity === "Unknown" ? ++acc : acc, 0)
    const minor = data.reduce((acc, cur) => cur.severity === "Minor" ? ++acc : acc, 0)
    const moderate = data.reduce((acc, cur) => cur.severity === "Moderate" ? ++acc : acc, 0)
    const major = data.reduce((acc, cur) => cur.severity === "Major" ? ++acc : acc, 0)
    const severityJSON = [
      {
        Severity: "Unknown",
        val: unknown
      },
      {
        Severity: "Minor",
        val: minor
      },
      {
        Severity: "Moderate",
        val: moderate
      },
      {
        Severity: "Major",
        val: major
      }
    ]
    this.setState({ severityData: severityJSON })
  }

  getDeviceData = async () => {
    let data = []
    data = await getCCTVs()
    const cctvIn = data.reduce((acc, cur) => cur.inService === "true" ? ++acc : acc, 0)
    const cctvOut = data.length - cctvIn
    data = await getDrones()
    const droneIn = data.reduce((acc, cur) => cur.inService === "true" ? ++acc : acc, 0)
    const droneOut = data.length - droneIn
    data = await getIoTs()
    const iotIn = data.reduce((acc, cur) => cur.inService === "true" ? ++acc : acc, 0)
    const iotOut = data.length - iotIn
    const serviceJSON = [
      {
        "id": "CCTVs",
        "data": [
          {
            "x": "Available",
            "y": cctvIn
          },
          {
            "x": "Unavailable",
            "y": cctvOut
          }
        ]
      },
      {
        "id": "Drones",
        "data": [
          {
            "x": "Available",
            "y": droneIn
          },
          {
            "x": "Unavailable",
            "y": droneOut
          }
        ]
      },
      {
        "id": "IoTs",
        "data": [
          {
            "x": "Available",
            "y": iotIn
          },
          {
            "x": "Unavailable",
            "y": iotOut
          }
        ]
      }
    ]
    this.setState({ serviceData: serviceJSON })
  }

  handleItemClick = (item) => {
    const map = this.mapRef.current;
    this.setState({
      selectedItem: item,
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

  getFilteredEvents = async () => {

    const { query } = this.state;
    let data = [];
    data = await searchEvents(query);
    if (typeof data != "undefined")
      this.setState({ items: data })
    else
      this.setState({ items: [] })
  }

  handleFilterChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleFilter = (event) => {
    event.preventDefault();
    if (this.state.query == "")
      this.getEventData()
    else
      this.getFilteredEvents();
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { items, selectedItem, markerPosition, mapCenter } = this.state;
    return (
      <Container fluid className='main-page'>
        <Row className='h-100'>
          <Col md={3} className='side-bar p-3 ms-3 me-0'>
            <h3 className="text-light mb-3">Events</h3>
            <Form className="d-flex mb-3" onSubmit={this.handleFilter}>
              <Form.Control
                type="text"
                placeholder="Filter"
                value={this.state.query}
                onChange={this.handleFilterChange}
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Filter</Button>
            </Form>
            {/* List of road incidents */}
            <Accordion style={{ maxHeight: '750px', overflowY: 'auto', marginBottom: '15px' }}>
              {items.length > 0 &&
                items.map(item => (
                  <Accordion.Item eventKey={item.id} className='side-bar-content mb-2 p-2' key={item.id} onClick={() => this.handleItemClick(item)}>
                    <Accordion.Header>{item.eventType} #{item.id}</Accordion.Header>
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
              <MarkerClusterGroup>
                {items.length > 0 &&
                  items.map(item => (
                    <Marker key={item.id} position={[item.latitude, item.longitude]}>
                      <Popup>
                        {item.eventType} #{item.id}. <br /> Name: {item.locationName} <br /> Type: {item.subType} <br /> Severity: {item.severity} <br /> Latitude: {item.latitude}, Longitude: {item.longitude}.
                      </Popup>
                    </Marker>
                  ))}
              </MarkerClusterGroup>
            </MapContainer>
            <div className='device-details mt-3'>
              <LineChart />
            </div>
          </Col>
          <Col md={3} className='side-bar d-flex flex-column p-3 ms-3 me-3'>
            <div className='device-details mt-3'>
              <RadialBarChart data={this.state.serviceData}/>
            </div>
            <div className='device-details mt-3'>
              <StreamChart />
            </div>
            <div className='device-details mt-3'>
              <BarChart data={this.state.severityData} />
            </div>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default withRouter(Dashboard);