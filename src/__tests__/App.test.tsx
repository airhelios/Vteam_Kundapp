import { render, screen } from '@testing-library/react';
import App from '../App';
import {renderWithProviders } from '../helpers/test-redux';
// import {renderWithProviders } from './helpers/test-redux';
// import { MemoryRouter as Router } from "react-router-dom";


describe('App', () => {
  it('renders App component', () => {
    render(renderWithProviders(<App/>));
    expect(screen.getByTestId(/app-test/i)).toBeInTheDocument();
});
});
