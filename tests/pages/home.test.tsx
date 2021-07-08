import React from 'react';
import '@testing-library/jest-dom';
import { Home } from '@pages';
import { cleanup, render } from '../renderTest';

afterEach(cleanup);

describe('<Home />', () => {
  describe('Simple Render', () => {
    it('should take a snapshot', () => {
      const { asFragment } = render(<Home />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render without errors', () => {
      const component = render(<Home />);

      expect(component).toBeTruthy();
    });
  });
});
