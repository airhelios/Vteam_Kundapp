import { render, screen } from '@testing-library/react';
import Home from './Home';
import { renderWithProviders } from '../helpers/test-redux';
import { MemoryRouter as Router } from "react-router-dom";


describe('Home', () => {
  it('renders App component', () => {
    render(renderWithProviders(<Router><Home/></Router>));
    expect(screen.getByTestId(/Home/i)).toBeInTheDocument();
});
});
