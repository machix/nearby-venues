import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Loader from 'react-loader-spinner'
import utils from './utils';

class App extends Component {
  state = {
    venues: [],
    radius: '250',
    currentLocation: {},
    loaderVisibility: false,
    zoom: 17
  }

  RADIUS_OPTIONS = {
    '250': 17,
    '500': 16,
    '1000': 15.5,
    '2000': 15,
    '3000': 14.5,
    '5000': 14.5,
    '10000': 13.5,
  }

  findNearbyVenues = ({lat, lng}) => {
    const {radius} = this.state;
    this.setState({ loaderVisibility: true});
    utils.fetchVenues({lat, lng, radius})
      .then((venues) => {
        this.setState({ venues, loaderVisibility: false});
      })
      .catch(() => {
        this.setState({ loaderVisibility: false });
        alert('Error fetching venues');
      })
   }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.setState({ currentLocation});
      this.findNearbyVenues(currentLocation);
    }, (err) => {
      alert('Error fetching Location \n' + err.message);
    });
  }

  changeRadius = (event) => {
    const radius = event.target.value;
    event.target.value && this.setState({ radius, zoom: this.RADIUS_OPTIONS[radius]} , () => {
      this.findNearbyVenues(this.state.currentLocation);
    });
  }

  render() {
    const { venues, radius, currentLocation, loaderVisibility, zoom} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          <code>Here are some things to do near you. Tap on any marker to know more.</code>
          <br/>
          <code>Radius <select value={radius} onChange={this.changeRadius}>
            {Object.keys(this.RADIUS_OPTIONS).map((radius) => <option key={radius} value={radius}>{radius} meters</option>)}
            </select>
          </code>
        </p>
        {currentLocation.lat && currentLocation.lng  ? 
          <Map center={currentLocation}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBPC0eaoaCqPztvybllCJV03d7J0uOricc"
            loadingElement={<div className='full-height'/>}
            containerElement={<div className='map-element' />}
            venues={venues} zoom={zoom}
            mapElement={<div className='full-height' />}></Map> :
          <code>Fetching your location...</code>
        }
        {loaderVisibility ? <div className='loader'>
          <Loader type="Bars" color="white" height="100" width="100"/>
        </div> : null}
      </div>
    );
  }
}

export default App;