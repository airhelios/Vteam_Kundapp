import { render, screen } from '@testing-library/react';
import {renderWithProviders } from '../../helpers/test-redux';
import { MemoryRouter as Router } from "react-router-dom";
import MyRentals from '../../pages/MyRentals';

describe('MyRentals', () => {
  it('renders MyRentals component', () => {
    render(renderWithProviders(<Router><MyRentals/></Router>));
    expect(screen.getByTestId("my-rentals")).toBeInTheDocument();
  });
});


