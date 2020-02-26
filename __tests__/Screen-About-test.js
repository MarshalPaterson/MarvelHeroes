import React from 'react';
import renderer from 'react-test-renderer';
import AboutScreen from '../src/containers/AboutScreen';

test('renders correctly', () => {
  const tree = renderer.create(<AboutScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});