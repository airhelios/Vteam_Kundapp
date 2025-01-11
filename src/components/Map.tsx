import { MapContainer,  TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import {LatLngExpression } from 'leaflet';
import { API_URL } from '../helpers/config';
import axios, {AxiosError} from 'axios';
import { Zone } from '../helpers/map/leaflet-types'
import { useParams } from "react-router-dom";
import { cities } from '../helpers/map/cities';
import MapCenter from './MapCenter';
import { renderScooterMarkers, renderPolygons } from '../helpers/map/renders';
import { bikePerCity, BikeStatus } from '../helpers/bike-functions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import LocationMarker from './LocationMarker';
import { Scooter } from '../helpers/bike-functions';


export default function Map() {
    const { city }  = useParams();
    const [startPosition, setStartPosition] = useState<LatLngExpression>([59.2741, 15.2066]);
    const [scooterData, setScooterData] = useState<BikeStatus[] | Scooter[]>([]);
    const [zoneData, setZoneData] = useState<Zone[]>([]);
    const zoom = 11;
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (city && cities[city]) {
            setStartPosition(cities[city]);
        }
    }, [city]);
    
    useEffect(() => {
        const fetchScooters = async() => {
        try {
                if (city) {
                    const data = await bikePerCity(city, token, 'Available')
                    setScooterData(data);
                }
            }

            catch(error)
            {
              const axiosError = error as AxiosError;
              console.log(axiosError?.response?.data);
            }
      }
      fetchScooters();
      },[city, token])
    
    useEffect(() => {
    const fetchZones = async() => {
    try {

            const response = await axios.get(`${API_URL}/zone/city/${city}`);
            setZoneData(response.data);
        }

        catch(error)
        {
          const axiosError = error as AxiosError;
          console.log(axiosError?.response?.data);
        }
    }
    fetchZones();
    },[city])

  return (
    <div id="map" 
    data-testid="map"
    className="h-screen flex-grow" >
        <MapContainer

        className="w-full h-full"
        center={startPosition}
        zoom={zoom}
        scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapCenter center={startPosition} zoom={zoom} />
            { renderScooterMarkers(scooterData) }
            {/* { renderStationMarkers(stationPositions) } */}
            { renderPolygons(zoneData) }
            <LocationMarker />

        </MapContainer>
    </div>
  )
};
