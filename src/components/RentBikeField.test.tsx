import { render, screen } from '@testing-library/react';
import {renderWithProviders } from '../helpers/test-redux';
import RentBikeField from './RentBikeField';

describe('RentBikeField', () => {
  it('renders RentBikeField component', () => {
    const preloadedState = {
        auth: {
          isLoggedIn: true,
          role: "test",
          token: "test-token",
          user: "test-user"
 
        },
        rent: {
            bikeId: 'test-bike',
            beingRented: false,
            startTime: "2024-01-01",
            user: "test-user",
            tripID: 5
        },
      };
    render(renderWithProviders( <RentBikeField/>, preloadedState));
    expect(screen.getByTestId("rentbikefield")).toBeInTheDocument();
  });
});
