import { render, screen } from '@testing-library/react';
import {renderWithProviders } from '../helpers/test-redux';
import MarkerBoosted from '../components/MarkerBoosted';

describe('MarkerBoosted', () => {
  it('renders MarkerBoosted component', () => {
    render(renderWithProviders(<MarkerBoosted id="test" batteryLevel={99} latitude={50} longitude={49} status="Available"/>));
    expect(screen.getByText("Marker")).toBeInTheDocument();
  });
});
