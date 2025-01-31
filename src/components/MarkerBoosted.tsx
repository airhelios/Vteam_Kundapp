import { useState } from 'react';
import { Popup, Marker } from 'react-leaflet';
import RentButtonMarker from './RentButtonMarker';
import { Scooter } from '../helpers/bike-types';


export default function MarkerBoosted( {id, batteryLevel, latitude, longitude, status} : Scooter) {
    const [showRentButton, setShowRentButton] = useState(true);


    return (
        <Marker position={[latitude, longitude] }>
        <div data-testid="marker"></div>
        <Popup>
            <p>Id: {id} </p>
            <p>BatteryLevel: {batteryLevel} </p>
            { showRentButton ?
                <>
                    <p>Status: {status} </p>
                    <RentButtonMarker bikeId={id} showRentButton={showRentButton} setShowRentButton={setShowRentButton}/>
                </>
                :
                <p>Status: Was just rented </p>
            }
        </Popup>
        </Marker>
    )
}
