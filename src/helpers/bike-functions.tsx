import axios, { AxiosResponse } from 'axios';
import { API_URL, getHeader } from '../helpers/config';
import { toast } from 'react-toastify';

export type City = {
    id: string;
    name: string;
    latitude: number | null;
    longitude: number | null;
    createdAt: string;
    updatedAt: string; 
  };
  
export type BikeStatus = {
    batteryLevel: number;
    city: City;
    createdAt: string;
    id: string;
    latitude: number;
    longitude: number;
    status: "Rented" | "Available" | "Service" | string; // Add other possible status values if needed
    updatedAt: string; // ISO timestamp as a string
};


export const bikePerCity = async (city: string, token: string, status = '') : Promise<AxiosResponse<any, any>> =>
{
    let data;
    
    try {
            const response = await axios.get(`${API_URL}/bike/city/${city}`, getHeader(token));
            if (status === '')
            {
                data = response;
            } else {
                data = response.data.filter((item : BikeStatus) => item.status === status);
            }
    }
    catch(error: any) {
        console.log(error.response?.data);;
        toast.error(error.response.data.message)

    }
    return data;
}

export const allBikes = async ( token:string ) : Promise<AxiosResponse<any, any>> =>
{
        let data;
        try {
                const response = await axios.get(`${API_URL}/bike`, getHeader(token));
                data = response.data;
        }
        catch(error: any) {
            console.log(error.response);
            toast.error(error.response.data.message)

        }
        return data;
}

export const rentBike = async (bikeId: string, token: string) : Promise<AxiosResponse<any, any>> =>
{
        let data;
        try {
                const response = await axios.post(`${API_URL}/rental/bike/${bikeId}`, {}, getHeader(token));
                data = response.data;
        }
        catch(error: any) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message)
        }
        return data;
}

export const returnBike = async (bikeId: string, token: string) : Promise<AxiosResponse<any, any>> =>
    {
            let data;
            try {
                    const response = await axios.post(`${API_URL}/rental/${bikeId}/end`, {}, getHeader(token));
                    data = response.data;
                    console.log(data)
            }
            catch(error: any) {
                console.log(error.response);
                toast.error(error.response.data.message)

            }
            return data;
    }
