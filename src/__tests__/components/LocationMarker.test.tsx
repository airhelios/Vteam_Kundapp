import { render, screen, waitFor } from '@testing-library/react';
import LocationMarker from '../../components/LocationMarker';
import { MapContainer } from 'react-leaflet';

// Mocking react-leaflet
jest.mock('react-leaflet', () => ({
    ...jest.requireActual('react-leaflet'),
    useMap: jest.fn(() => mockMap),
  }));
  
  // Define a mock map object
  const mockMap = {
    setView: jest.fn(),
    getZoom: jest.fn().mockReturnValue(13),
    flyTo: jest.fn(),
    addLayer: jest.fn(),
    locate: jest.fn(() => ({
      on: jest.fn((event, callback) => {
        if (event === 'locationfound') {
          callback({
            latlng: { lat: 51.505, lng: -0.09 },
            accuracy: 100,
            bounds: { toBBoxString: () => '51.505,-0.09,51.505,-0.09' },
          });
        }
      }),
    })),
  };

describe('LocationMarker', () => {
  it('renders LocationMarker component', async () => {
        render(<MapContainer><LocationMarker /></MapContainer>);
        expect(mockMap.locate).toHaveBeenCalled();
        expect(mockMap.flyTo).toHaveBeenCalledWith({ lat: 51.505, lng: -0.09 }, 13);
  });
});