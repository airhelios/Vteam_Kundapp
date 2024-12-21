import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// import {renderWithProviders } from './helpers/test-redux';
// import { MemoryRouter as Router } from "react-router-dom";


describe('App', () => {
  it('renders App component', () => {
    render(<App/>);
    expect(screen.getByTestId(/app-test/i)).toBeInTheDocument();
});
});
