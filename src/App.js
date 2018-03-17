import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, OverlayView} from "react-google-maps"

function getQueryString(params) {
  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

const VenueMarker = ({ rating, tier, ratingColor }) => (
  <div style={{ backgroundColor: '#' + ratingColor}} class='venue-marker'>
    {rating}
    {' | ' + new Array(tier).fill('$').join(' ')}
    <span class='bottom-arrow' style={{ borderTopColor: '#' + ratingColor }}></span>
  </div>
);

const Map = withScriptjs(withGoogleMap(({ defaultCenter, venues}) => <GoogleMap
  defaultZoom={16}
  center={defaultCenter}
>
  <Marker position={defaultCenter} />
  {venues.map((venue, i) => <OverlayView mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} key={i} position={venue} ><VenueMarker {...venue}/></OverlayView>)}
</GoogleMap>))

class App extends Component {
  state = {
    venues: [],
    radius: '',
    currentLocation: { lat: 40.7243, lng: -74.0018}
  }

  fetchVenues = ({lat, lng}) => {
    const qs = {
      client_id: '1CPAVHCZ44EOTXDVRLPYJPWXBSAVTNSWGVLG0QRST32H3DNR',
      client_secret: '51MYE2M4S0NJIBG5YOVQLTW1RS00XEV0UZD32BPYYNDYWTJI',
      openNow: 1,
      ll: `${lat},${lng}`,
      v: '20170801'
    }
    fetch('https://api.foursquare.com/v2/venues/explore?' + getQueryString(qs))
      .then(res => res.json())
      .then(({response}) => {
        const venues = response.groups[0].items.map(({venue}) => ({
          formattedAddress: venue.location.formattedAddress,
          contact: venue.contact,
          name: venue.name,
          tier: venue.price && venue.price.tier,
          rating: venue.rating,
          ratingColor: venue.ratingColor,
          lat: venue.location.lat,
          lng: venue.location.lng,
          tag: venue.categories[0].name
        }));
        this.setState({venues});
        console.log('hehehhe', venues);
      })
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.setState({ currentLocation});
      this.fetchVenues(currentLocation);
      console.log('position', position);
    }, console.log );
    this.fetchVenues({ lat: 40.7243, lng: -74.0018});    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.currentLocation.lat ? 
          <Map defaultCenter={this.state.currentLocation}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            venues={this.state.venues}
            mapElement={<div style={{ height: `100%` }} />}></Map> : <p>fetching location</p>}
        
      </div>
    );
  }
}

export default App;
