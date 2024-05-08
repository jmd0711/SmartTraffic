import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import InformationService from './InformationService';

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
      inService: '',
      isValidLatitude: true,
      isValidLongitude: true,
    };
  }

 

  componentDidMount() {
    console.log("here1");
    if (this.props.selectedItem) {
      console.log("here3");
      // Fetch existing data for editing based on itemId prop
      fetch(`http://localhost:8080/iot/${this.props.selectedItem.id}`)
        .then(response => response.json())
        .then(data => {
          // Update state with fetched data
          this.setState({
            district: data.district,
            county: data.county,
            longitude: data.longitude,
            latitude: data.latitude,
            elevation: data.elevation,
            postmile: data.postmile,
            inService: data.inService,
          });
          console.log("here2");
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    console.log("here");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  handleCancel = () => {
    this.toggleForm();
    window.location.reload();
  };


  handleSubmit = e => {
    e.preventDefault();
  
    
    this.props.onSubmit(this.state);
    // Reset the form fields after submission
    this.setState({
      showForm: false,
      district: '',
      county: '',
      longitude: '',
      latitude: '',
      elevation: '',
      postmile: '',
      inService: ''
    });
    this.props.onClose();
  };

  // toggleForm = (mode, itemId = null) => {
  //   this.setState(prevState => ({
  //     showForm: !prevState.showForm,
  //   }));
  // };

  isValidLatitude = (latitude) => {
    const pattern = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
    return pattern.test(latitude);
  };

  isValidLongitude = (longitude) => {
    const pattern = /^-?((1[0-7]|[1-9]?)[0-9]\.{1}\d{1,6}|180\.{1}0{1,6})$/;
    return pattern.test(longitude);
  };
  

  render() {
    return (
      <div className='device-details p-3 mt-3' style={{ marginBottom: '15px'}}>
        {this.state.showForm || (
          <div className="popup">
            <p>{this.props.mode === 'add' ? 'Add Camera' : ('Update Camera Information')}</p>
            <form onSubmit={this.handleSubmit}>
              {/* <input
                type="text"
                name="id"
                placeholder="ID"
                value={this.state.id}
                onChange={this.handleChange}
              /> */}
              <input
                type="text"
                name="district"
                placeholder="District"
                value={this.state.district}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                name="county"
                placeholder="County"
                value={this.state.county}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={this.state.longitude}
                onChange={this.handleChange}
                required
              />
              {!this.isValidLongitude && (
                <div className="error-message">Please enter a valid Longitude.</div>
              )}
              <input
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={this.state.latitude}
                onChange={this.handleChange}
                required
              />
              {!this.isValidLatitude && (
                <div className="error-message">Please enter a valid Latitude.</div>
              )}
              <input
                type="text"
                name="elevation"
                placeholder="Elevation"
                value={this.state.elevation}
                onChange={this.handleChange}
                required
              />
               <input
                type="text"
                name="postmiles"
                placeholder="PostMiles"
                value={this.state.postmiles}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                name="inService"
                placeholder="In Service"
                value={this.state.inService}
                onChange={this.handleChange}
                required
              />
              
              <div>
                {/* <Button variant="primary" style={{ marginLeft: '15px'}} type="submit">
                Submit
                </Button> */}
                <Button variant="primary" style={{ marginLeft: '400px'}} type="submit">{this.props.mode === 'add' ? 'Add' : 'Update'}</Button>
                <Button onClick={this.handleCancel} variant="danger" style={{ marginLeft: '15px'}} type="submit">
                Cancel
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
