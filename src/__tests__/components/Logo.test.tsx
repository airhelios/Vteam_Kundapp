
import { render, screen } from '@testing-library/react';
import Logo from '../../components/Logo';



describe('Logo', () => {
  it('renders Logo component', () => {
    render(<Logo/>);
    expect(screen.getByTestId('logo')).toBeInTheDocument(); // Find item by test-id
});
});


