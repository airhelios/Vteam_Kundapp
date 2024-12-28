import { MapContainer, Popup, Marker, TileLayer, Polygon, Tooltip} from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import { LatLngTuple,  LatLngExpression } from 'leaflet';
import { API_URL } from '../helpers/config';
import axios from 'axios';
import { Scooter, Zone } from '../helpers/map/leaflet-types'
import { useParams } from "react-router-dom";
import { cities } from '../helpers/map/cities';
import MapCenter from './MapCenter';
import { renderScooterMarkers, renderStationMarkers, renderPolygons } from '../helpers/map/renders';
import { bikePerCity } from '../helpers/bike-functions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';


export default function Map() {
    const { city }  = useParams();
    const [startPosition, setStartPosition] = useState<LatLngExpression>([59.2741, 15.2066]);
    // const {isLoggedIn, token, user, role} = useSelector((state: RootState) =>  state.auth);
    const [scooterData, setScooterData] = useState<Scooter[]>([]);
    const [zoneData, setZoneData] = useState<Zone[]>([]);
    const zoom = 11;
    const stationPositions: LatLngTuple[] = [[51.505, -0.04],[51.515, -0.15],[51.535, -0.08]];
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
                    // const response = await axios.get(`${API_URL}/bike/city/${city}`);
                    // console.log(response.data)
                    const data = await bikePerCity(city, token, 'Available')
                    setScooterData(data);
                }
            }

            catch(error)
            {
            }
      }
      fetchScooters();
      },[])
    
    useEffect(() => {
    const fetchZones = async() => {
    try {

            const response = await axios.get(`${API_URL}/zone/city/${city}`);
            setZoneData(response.data);
        }
        catch(error)
        {
        }
    }
    fetchZones();
    },[])

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
            
        </MapContainer>
    </div>
  )
};
