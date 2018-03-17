import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, OverlayView } from "react-google-maps"

const VenueMarker = ({ rating = '-', tier, ratingColor, name, tag, formattedAddress, lat, lng, phone, url }) => (
  <div style={{ backgroundColor: '#' + ratingColor }} className='venue-marker'>
    <span className='venue-rating'>{rating}</span>
    <span className='venue-tier'>{new Array(tier).fill('$').join(' ')}</span>
    <span className='bottom-arrow' style={{ borderTopColor: '#' + ratingColor }}></span>
    <div className='marker-details'>
      <a href={url} className='venue-name'>{name}</a>
      <p className='venue-tag'>{tag}</p>
      <div className='marker-detail-content'>
        <div className='left-content'>
          <p className='venue-rating-detail'>Rating: {rating}</p>
          <a target='_blank' href={`http://maps.google.com/?daddr=${lat},${lng}`} className="btn" type="button"><span>Navigate</span></a>
          <a target='_blank' href={`tel:${phone}`} className="btn" type="button"><span>Call</span></a>
        </div>
        <div className='address-container'>
          <p>Address: </p>
          {formattedAddress.map((address, i) => <p key={i} className='address-text'>{address}</p>)}
        </div>
      </div>
    </div>
  </div>
);

const MapWithMarker = ({ center, venues, zoom }) => <GoogleMap zoom={zoom} center={center}>
  <Marker position={center} />
  {venues.map((venue, i) => <OverlayView mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} key={i} position={venue} >
    <VenueMarker {...venue} />
  </OverlayView>)}
</GoogleMap>


export default withScriptjs(withGoogleMap(MapWithMarker));