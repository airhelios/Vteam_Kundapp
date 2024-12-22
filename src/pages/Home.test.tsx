import { render, screen } from '@testing-library/react';
import Home from './Home';
import { renderWithProviders } from '../helpers/test-redux';


describe('Home', () => {
  it('renders App component', () => {
    render(renderWithProviders(<Home/>));
    expect(screen.getByTestId(/Home/i)).toBeInTheDocument();
});
});
