// import dotenv from 'dotenv';

// dotenv.config();
const port = parseInt(import.meta.env.VITE_PORT || "3000")
export const API_URL = "http://localhost:3535/v1";
const githubAuthUrl = 'https://github.com/login/oauth/authorize';
const clientId = 'Ov23liY1kaJ2acYLtBhq';
const redirectUri = `http://localhost:${port}/github/callback`;
const scope = 'user:email';
import markerIcon from '../assets/images/station.png';
import pinIcon from "../assets/images/icons8-pin-90.png"
export const GITHUB_URL = `${githubAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
import L from 'leaflet';
import { Bounce, ToastOptions } from 'react-toastify';

export const getHeader = (token: string, contentType?: string ) => {
    const config = {
        headers: {
            "Content-type" : contentType || "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return config;
 }

 
 export const iconStation = new L.Icon({
    iconUrl: markerIcon,
    iconSize:     [38, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [19, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
});


export const mePin = new L.Icon({
    iconUrl: pinIcon,
    iconSize:     [38, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [19, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export const toastOptionsSuccess: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
};

export const toastOptionsError: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce
}