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
      locationName: '',
      nearbyPlace: '',
      longitude: '',
      latitude: '',
      inService: '',
      videoUrl: '',
      imageUrl: '',
      isValidLatitude: true,
      isValidLongitude: true,
    };
  }

  componentDidMount() {
    console.log("here1");
    if (this.props.selectedItem) {
      console.log("here3");
      // Fetch existing data for editing based on itemId prop
      fetch(`http://54.215.68.185:8080/drone/${this.props.selectedItem.id}`)
        .then(response => response.json())
        .then(data => {
          // Update state with fetched data
          this.setState({
            locationName: data.locationName,
            nearbyPlace: data.nearbyPlace,
            longitude: data.longitude,
            latitude: data.latitude,
            inService: data.inService,
            videoUrl: data.videoUrl,
            imageUrl: data.imageUrl
          });
          console.log("here2");
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    console.log("here");
  }

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  isValidLatitude = (latitude) => {
    const pattern = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
    return pattern.test(latitude);
  };

  isValidLongitude = (longitude) => {
    const pattern = /^-?((1[0-7]|[1-9]?)[0-9]\.{1}\d{1,6}|180\.{1}0{1,6})$/;
    return pattern.test(longitude);
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

  handleSubmit = e => {
    e.preventDefault();
    // // Check latitude and longitude input format
    // if (!this.isValidLatitude(this.state.latitude)) {
    //   this.setState({isValidLatitude: false });
    //   return;
    // }
    // if (!this.isValidLongitude(this.state.longitude)) {
    //   this.setState({isValidLongitude: false });
    //   return;
    // }
    
    this.props.onSubmit(this.state);
    // Reset the form fields after submission
    this.setState({
      showForm: false,
      locationName: '',
      nearbyPlace: '',
      longitude: '',
      latitude: '',
      inService: '',
      videoUrl: '',
      imageUrl: ''
    });
    this.props.onClose();
  };

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const {locationName, nearbyPlace, longitude, latitude, inService, videoUrl, imageUrl } = this.state;
    
  //   try {
  //     const response = await fetch('http://localhost:8080/drone/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         locationName,
  //         nearbyPlace,
  //         longitude,
  //         latitude,
  //         inService,
  //         videoUrl,
  //         imageUrl
  //       }),
  //     });
  
  //     if (response.ok) {
  //       console.log('Form data sent successfully');
  //       // Reset form fields and close the form
  //       this.setState({
  //         showForm: false,
  //         // id: '',
  //         locationName: '',
  //         nearbyPlace: '',
  //         longitude: '',
  //         latitude: '',
  //         inService: '',
  //         videoUrl: '',
  //         imageUrl: ''
  //       });
  //     } else {
  //       console.error('Failed to send form data');
  //     }
  //   } catch (error) {
  //     console.error('Error sending form data:', error);
  //   }
  //   this.setState(prevState => ({
  //     showForm: !prevState.showForm
  //   }));
  //   window.location.reload()
  // };
  

  render() {
    return (
      <div className='device-details p-3 mt-3' style={{ marginBottom: '15px'}}>
        {/* <button onClick={this.toggleForm}>Open Form</button> */}
        {this.state.showForm || (
          <div className="popup">
            {/* <p>Add Drone</p>*/}
            <p>{this.props.mode === 'add' ? 'Add Drone' : ('Update Drone Information')}</p>

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
                name="locationName"
                placeholder="Location Name"
                value={this.state.locationName}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="nearbyPlace"
                placeholder="Nearby Place"
                value={this.state.nearbyPlace}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={this.state.longitude}
                onChange={this.handleChange}
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
              />
              {!this.isValidLatitude && (
                <div className="error-message">Please enter a valid Latitude.</div>
              )}
              <input
                type="text"
                name="inService"
                placeholder="In Service"
                value={this.state.inService}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="videoUrl"
                placeholder="Video URL"
                value={this.state.videoUrl}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
              <div>
              {/*<Button variant="primary" style={{ marginLeft: '300px'}} type="submit">
              Submit
            </Button>*/}
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
