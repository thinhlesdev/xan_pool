import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { Home } from '@pages';
import { cleanup, render } from '../renderTest';

afterEach(cleanup);

const mock = new MockAdapter(axios);

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
