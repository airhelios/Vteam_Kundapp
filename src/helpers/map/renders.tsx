import { Popup, Marker, Polygon, Tooltip} from 'react-leaflet';
import { Scooter, Zone } from './leaflet-types'
import { LatLngTuple } from 'leaflet';
import { iconStation } from '../config';
import MarkerBoosted from '../../components/MarkerBoosted';

const zoneColors = (zoneType: string) => {
    switch(zoneType) {
        case "speed":
            return {color :"purple"}
        case "parking":
            return {color :"green"}
        case "charging":
            return {color :"blue"}
        default:
            return {color :"red"}
    }
}

const renderScooterMarkers = (scooterData: Scooter[])=>   (
    scooterData?.map((scooter, index) => (
        <MarkerBoosted key={index} id={scooter.id} batteryLevel={scooter.batteryLevel}
        status={scooter.status} latitude={scooter.latitude} longitude={scooter.longitude} />
    ))
    );


const renderStationMarkers  = (stationPositions: LatLngTuple[]) =>  (
    stationPositions?.map((position, index) => (
    <Marker key={index} position={position} icon={iconStation}>
        <Popup>
        { position }
        </Popup>
    </Marker>))
    );

const renderPolygons = ( zoneData: Zone[] ) =>  (
    zoneData?.map((zone, index) => (
        <Polygon pathOptions={zoneColors(zone.type)} positions={zone.polygon.map(point => [point.lat, point.lng])} key={index}>
            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} >
                <p>Id: {zone.id}</p>
                <p>Type: {zone.type}</p>
            </Tooltip>
        </Polygon>
    ))
);

export { renderScooterMarkers, renderStationMarkers, renderPolygons }
