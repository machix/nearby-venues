import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, OverlayView } from "react-google-maps"
import VenueMarker from './VenueMarker';

const MapWithMarker = ({ center, venues, zoom }) => <GoogleMap clickableIcons={false} zoom={zoom} center={center}>
  <Marker position={center} />
  {venues.map((venue, i) => <OverlayView mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} key={i} position={venue} >
    <VenueMarker {...venue} />
  </OverlayView>)}
</GoogleMap>


export default withScriptjs(withGoogleMap(MapWithMarker));