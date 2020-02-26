import React from 'react';
import renderer from 'react-test-renderer';
import TabIcon from './components/tabIcon';

test('renders correctly', () => {
  const tree = renderer.create(<TabIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
