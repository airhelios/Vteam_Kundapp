import {useState, useEffect} from 'react'
import { Marker,  Popup, useMap } from 'react-leaflet';
import L from "leaflet";
import { mePin } from '../helpers/config';

export default function LocationMarker() {
    {
        //Code from https://stackoverflow.com/questions/66500181/how-to-locate-react-leaflet-map-to-users-current-position-and-get-the-borders-f
        const [position, setPosition] = useState<L.LatLng | null>(null);
        const [, setBbox] = useState<string[]>([]);
    
        const map = useMap();
    
        useEffect(() => {
          map.locate().on("locationfound", function (e: L.LocationEvent) {
            setPosition(e.latlng);
            // map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
          });
        }, [map]);
    
        return position === null ? null : (
          <Marker data-testid="me" position={position} icon={mePin}>
            <Popup>
                Här är du
            </Popup>
          </Marker>
        );
    }
}
