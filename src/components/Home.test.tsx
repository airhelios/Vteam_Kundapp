import { render, screen } from '@testing-library/react';
import Home from './Home';



describe('Home', () => {
  it('renders App component', () => {
    render(<Home/>);
    expect(screen.getByTestId(/Home/i)).toBeInTheDocument();
});
});
