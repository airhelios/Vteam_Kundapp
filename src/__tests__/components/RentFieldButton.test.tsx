import { render, screen } from '@testing-library/react';
import {renderWithProviders } from '../../helpers/test-redux';
import RentFieldButton from '../../components/RentFieldButton';

describe('RentFieldButton', () => {
  it('renders RentFieldButtoncomponent', () => {
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
    render(renderWithProviders( <RentFieldButton shortId="test"/>, preloadedState));
    expect(screen.getByTestId("rentfieldbutton")).toBeInTheDocument();
  });
});
