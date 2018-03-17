import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import Loader from 'react-loader-spinner'
import utils from './utils';

class App extends Component {
  state = {
    venues: [],
    radius: '500',
    currentLocation: {},
    loaderVisibility: false
  }

  RADIUS_OPTIONS = ['250', '500', '1000', '2000', '3000', '5000', '10000']

  findNearbyVenues = ({lat, lng}) => {
    const {radius} = this.state;
    this.setState({ loaderVisibility: true});
    utils.fetchVenues({lat, lng, radius})
      .then((venues) => {
        this.setState({ venues, loaderVisibility: false});
        console.log('hehehhe', venues);
      })
   }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.setState({ currentLocation});
      this.findNearbyVenues(currentLocation);
      console.log('position', position);
    }, (err) => {
      alert('Error fetching Location \n' + err.message);
    } );
  }

  changeRadius = (event) => {
    this.setState({ radius: event.target.value}, () => {
      this.findNearbyVenues(this.state.currentLocation);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <select className='radius-select' value={this.state.radius} onChange={this.changeRadius}>
            {this.RADIUS_OPTIONS.map((radius, i) => <option key={i} value={radius}>{radius} meters</option>)}
            <option></option>
          </select>
        </header>
        <p className="App-intro">
          <code>Here are some things to do near you. Tap on any marker to know more.</code>
        </p>
        {this.state.currentLocation.lat && this.state.currentLocation.lng  ? 
          <Map center={this.state.currentLocation}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBPC0eaoaCqPztvybllCJV03d7J0uOricc"
            loadingElement={<div className='full-height'/>}
            containerElement={<div className='map-element' />}
            venues={this.state.venues}
            zoom={16}
            mapElement={<div className='full-height' />}></Map> :
          <code>Fetching your location...</code>
        }
        {this.state.loaderVisibility ? <div className='loader'>
          <Loader type="Bars" color="white" height="100" width="100"/>
        </div> : null}
      </div>
    );
  }
}

export default App;