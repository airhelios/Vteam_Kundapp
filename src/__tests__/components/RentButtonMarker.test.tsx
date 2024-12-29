import { render, screen } from '@testing-library/react';
import {renderWithProviders } from '../../helpers/test-redux';
import RentButtonMarker from '../../components/RentButtonMarker';

describe('RentButtonMarker', () => {
  it('renders RentButtonMarker component', () => {
    const mockSetShowRentButton = jest.fn();
    render(renderWithProviders( <RentButtonMarker bikeId="test" showRentButton={true} setShowRentButton={mockSetShowRentButton} />));
    expect(screen.getByTestId("rentbuttonmarker")).toBeInTheDocument();
  });
});
