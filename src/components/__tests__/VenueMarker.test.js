import React from 'react';
import VenueMarker from '../VenueMarker';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const props = {
    rating: '-',
    tier: 4,
    ratingColor: 'green',
    name: 'john doe',
    tag: 'hotel',
    formattedAddress: ['hi', 'abc'],
    lat: 13.7563,
    lng: 100.5018,
    phone: '9812472772',
    url: 'google.com'
  }
  const tree = renderer.create(<VenueMarker {...props} />);
  expect(tree).toMatchSnapshot();
});
