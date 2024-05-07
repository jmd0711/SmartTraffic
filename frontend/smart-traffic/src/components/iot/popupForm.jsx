import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class PopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      // id: '',
      district: '',
      county: '',
      longitude: '',
      latitude: '',
      elevation: '',
      postmile: '',
      inService: ''
    };
  }

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCancel = () => {
    this.toggleForm();
    window.location.reload();
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {district, county, longitude, latitude, elevation, postmile, inService } = this.state;
    
    try {
      const response = await fetch('http://localhost:8080/iot/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          district,
          county,
          longitude,
          latitude,
          elevation,
          postmile,
          inService
        }),
      });
  
      if (response.ok) {
        console.log('Form data sent successfully');
        // Reset form fields and close the form
        this.setState({
          showForm: false,
          // id: '',
          district: '',
          county: '',
          longitude: '',
          latitude: '',
          elevation: '',
          postmile: '',
          inService: ''
        });
      } else {
        console.error('Failed to send form data');
      }
    } catch (error) {
      console.error('Error sending form data:', error);
    }
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
    window.location.reload()
  };
  

  render() {
    return (
      <div className='device-details p-3 mt-3' style={{ marginBottom: '15px'}}>
        {/* <button onClick={this.toggleForm}>Open Form</button> */}
        {this.state.showForm || (
          <div className="popup">
            <p>Add Camera</p>
            <form onSubmit={this.handleSubmit}>
             
              <input
                type="text"
                name="district"
                placeholder="District"
                value={this.state.district}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="county"
                placeholder="County"
                value={this.state.county}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={this.state.longitude}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={this.state.latitude}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="elavtion"
                placeholder="elevation"
                value={this.state.elevation}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="postmiles"
                placeholder="PostMiles"
                value={this.state.postmiles}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="inService"
                placeholder="In Service"
                value={this.state.inService}
                onChange={this.handleChange}
              />
              <div>
                <Button onClick={this.handleCancel} variant="danger" style={{ marginLeft: '405px'}} type="submit">
                Cancel
                </Button>
                <Button variant="primary" style={{ marginLeft: '15px'}} type="submit">
                Submit
                </Button>
              </div>
            </form>
            {/* <button style={{ marginBottom: '15px'}} type="submit">Submit</button> */}
          </div>
        )}
      </div>
    );
  }
}

export default (PopupForm);