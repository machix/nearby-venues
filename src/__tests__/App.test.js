import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import { wrap } from 'module';
import utils from '../utils';


jest.mock('../utils', () => ({
  fetchVenues: jest.fn(() => Promise.resolve(['1', '2']))
}))
describe('App.js: contains logic of fetching data', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<App/>);
    instance = wrapper.instance();
  })
  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });
  it('findNearbyVenues: success', async () => {
    wrapper.setState({ radius: '250'});
    await instance.findNearbyVenues({
      lat: 13.7563,
      lng: 100.5018});
    expect(utils.fetchVenues).toBeCalledWith({
      lat: 13.7563,
      lng: 100.5018,
      radius: '250'
    })
    expect(wrapper.state().venues).toEqual(['1', '2'])
  })
  it('findNearbyVenues: failure', async () => {
    utils.fetchVenues.mockImplementation(() => Promise.reject('api failed'))
      await instance.findNearbyVenues({
        lat: 13.7563,
        lng: 100.5018
      });
    expect(alert).toBeCalledWith('Error fetching venues');
  })

  it('componentDidMount: should fetch user\'s location', () => {
    instance.findNearbyVenues = jest.fn();
    instance.componentDidMount();
    expect(navigator.geolocation.getCurrentPosition).toBeCalled()
    expect(instance.findNearbyVenues).toBeCalledWith({
      lat: 13.7563,
      lng: 100.5018
    })
  })
  it('changeRadius: should set radius and zoom level', () => {
    instance.findNearbyVenues = jest.fn();
    instance.changeRadius({target: {value: '500'}});
    expect(instance.state.radius).toBe('500');
    expect(instance.state.zoom).toBe(16);
    expect(instance.findNearbyVenues).toBeCalledWith({
      lat: 13.7563,
      lng: 100.5018
    })
  })
})

