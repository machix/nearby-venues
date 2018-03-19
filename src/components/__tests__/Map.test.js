import React from 'react';
import Map from '../Map';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const props = {
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBPC0eaoaCqPztvybllCJV03d7J0uOricc",
    loadingElement:< div className='full-height' />,
    containerElement : < div className = 'map-element' />,
    venues :  [],
    zoom: 10,
    mapElement : < div className = 'full-height' />
  }
  const tree = renderer.create(<Map {...props}/>);
  expect(tree).toMatchSnapshot();
});
