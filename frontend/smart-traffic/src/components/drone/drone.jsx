import React, { useState, useEffect } from "react"
import { Component } from "react"
import { withRouter } from "../withrouter"
import { Container, Row, Col, Stack, InputGroup, Form, Button } from "react-bootstrap"

import { MapContainer, TileLayer, useMap, Popup, Marker, useMapEvents } from 'react-leaflet'
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon, point } from "leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";


let allmarkers = [
  {
    geocode: [37.3, -121.9],
    popUp: "Drone 1" //'https://www.youtube.com/embed/LE3kyE_pMGE?si=bh2LIRTwotaa5tqP'
  },
  {
    geocode: [37.4, -121.8],
    popUp: "Drone 2"
  },
  {
    geocode: [37.5, -121.7],
    popUp: "Drone 3"
  }
];

const customIcon = new Icon({
  iconUrl: require("./smart-drone.png"),
  iconSize: [38, 38]
});
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};



class Drone extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Container fluid className='main-page'>
        <Row className='h-100'>

          <Col md={3} className="side-bar p-3">
            <h3 className="text-light mb-3">Drones</h3>
            <Form.Control
              type="text"
              placeholder="Filter"
              className="mb-3"
            />
            {/* List of Drone cameras */}
            <div className='side-bar-content mb-2 p-2'>Drone #1</div>
            <div className='side-bar-content mb-2 p-2'>Drone #2</div>
            <div className='side-bar-content mb-2 p-2'>Drone #3</div>
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
                placeholder="Search Area or Drone id"
                className="me-3"
                style={{ flexGrow: 1 }}
              />
              <Button variant="primary" type="submit">Search</Button>
            </Form>
            <MapContainer center={[37.334665328, -121.875329832]} zoom={12} scrollWheelZoom={true}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
              >
                {allmarkers.map((marker) => (
                  <Marker position={marker.geocode} icon={customIcon} draggable={true}>
                    <Popup>{marker.popUp} </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
            <div className='device-details p-3 mt-3'>Drone #1
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
    )
  }
}

export default withRouter(Drone)


//<a href="https://www.flaticon.com/free-icons/smart-drone" title="smart-drone icons">Smart-drone icons created by Flat Icons - Flaticon</a>