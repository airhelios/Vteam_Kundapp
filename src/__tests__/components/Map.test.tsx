
import { render, screen } from '@testing-library/react';
import Map from '../../components/Map';
import {renderWithProviders } from '../../helpers/test-redux';

jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMap: jest.fn(() => ({
    setView: jest.fn(),
    getZoom: jest.fn(),
    flyTo: jest.fn(),
    addLayer: jest.fn(),
    locate: jest.fn().mockReturnValue({
    on: jest.fn().mockImplementation((_, callback) => 
        setTimeout(() => callback({
            latlng: { lat: 51.505, lng: -0.09 },
            accuracy: 100,
            bounds: { toBBoxString: () => "51.505,-0.09,51.505,-0.09" }
        }), 0)
        )
    })
  }))
}));


describe('Map', () => {
  it('renders Map component', () => {
    render(renderWithProviders(<Map/>));
    expect(screen.getByTestId('map')).toBeInTheDocument(); // Find item by test-id
});
});


