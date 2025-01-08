import { render, screen } from '@testing-library/react';
import ShowMap from '../../pages/ShowMap';
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

describe('ShowMap', () => {
  it('renders ShowMap component', () => {
    render(renderWithProviders(<ShowMap/>));
    expect(screen.getByTestId("show-map")).toBeInTheDocument();
  });
});


