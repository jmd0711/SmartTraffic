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
    popUp:  "Drone 1" //'https://www.youtube.com/embed/LE3kyE_pMGE?si=bh2LIRTwotaa5tqP'
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
      <div className="main-page">
        <Container>
          {/*<h3 className="page-header"> DRONE PAGE </h3>*/}
          <Row className="justify-content-center">

            <Col xs={4} className="section sidebar">
              <h1>Drones</h1>
              <Form.Control
                placeholder="Filter"
                aria-label="Filter"
                aria-describedby="basic-addon2"
              />
              <Stack gap={3}>
                <div className="p-2">First item</div>
                <div className="p-2">Second item</div>
                <div className="p-2">Third item</div>
              </Stack>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Add Drone
                </Button>
              </div>
            </Col>
            <Col>
              <Row className="section map justify-content-center">
              <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2">
                Search
              </Button>
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
            </InputGroup>
              </Row>
              <Row className="section">
                <Stack direction="horizontal" gap={3} className="justify-content-md-center">
                  <div className="p-2">First item</div>
                  <div className="p-2">Second item</div>
                  <div className="p-2">Third item</div>
                </Stack>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Drone)


//<a href="https://www.flaticon.com/free-icons/smart-drone" title="smart-drone icons">Smart-drone icons created by Flat Icons - Flaticon</a>