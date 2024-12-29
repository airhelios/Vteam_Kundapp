import axios from 'axios';
import { API_URL, getHeader } from '../helpers/config';
import { toast } from 'react-toastify';
import { toastOptionsError, toastOptionsSuccess } from '../helpers/config';


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

type bikeArray = {
    [key: string] : any;
}

type RentBikeResponse = Array<{
    id: number;
    [key: string]: any; // Allow additional unknown keys
  }>;

export const bikePerCity = async (city: string, token: string, status = '') : Promise<any> =>
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
        toast.error(error.response.data.message, toastOptionsError)

    }
    console.log(data);
    return data;
}

export const allBikes = async ( token:string ) : Promise<any> =>
{
        let data;
        try {
                const response = await axios.get(`${API_URL}/bike`, getHeader(token));
                data = response.data;
        }
        catch(error: any) {
            console.log(error.response);
            toast.error(error.response.data.message, toastOptionsError)

        }
        return data;
}

export const rentBike = async (bikeId: string, token: string) : Promise<RentBikeResponse | any> =>
{
        let data: RentBikeResponse | any;
        try
        {
            const response = await axios.post(`${API_URL}/rental/bike/${bikeId}`, {}, getHeader(token));

            data = {... response.data, "statusCode": 200 };
            console.log(response);
            console.log(data);
                
        }
        catch(error: any) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message,toastOptionsError)
            console.log(error.response.data);
            data = error.response.data;
        }
        return data;
}

export const returnBike = async (tripID: string | null, token: string) : Promise<any> =>
{
        let data: RentBikeResponse | any;

            try {
                    const response = await axios.post(`${API_URL}/rental/${tripID}/end`, {}, getHeader(token));
                    data = {... response.data, "statusCode": 200 };
                    console.log(response)
                    console.log(data)
            }
            catch(error: any) {
                console.log(error)
                console.log(error.response);
                toast.error(error.response.data.message, toastOptionsError)
                data = error.response.data;
            }
            return data;
}


// export const allRentals = async (userId: string, token: string): Promise<any> => {
//     let data = {};
//     try {
//         const response = await axios.get(`${API_URL}/rental/`, getHeader(token));
//         data = response.data.filter((item: any)  => item.customer.username === userId);
//     } catch(error)
//     {
//         console.log(`No rentals found for user ${userId}`);
//     }
//     return data;
// }

export const allRentals = async (token: string): Promise<any> => {
    let data = {};
    try {
        let me = await axios.get(`${API_URL}/auth/me`, getHeader(token));
        let userId = me.data.githubId;
        const response = await axios.get(`${API_URL}/rental/customer/${userId}`, getHeader(token));
        console.log(userId)
        // data = response.data.filter((item: any)  => item.customer.username === userId);
        data = response.data;
    } catch(error)
    {
        console.log(`No rentals found for user ${userId}`);
    }
    return data;
}


export const bikeIdByFive = async (bikeIdFive: string | null, token: string): Promise<string> => {
    const data = await allBikes(token);
    const bike = data.find((item: bikeArray) => item.id.startsWith(bikeIdFive?.toLowerCase()));

    return bike.id;
}