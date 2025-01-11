import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL, getHeader } from '../helpers/config';
import { toast } from 'react-toastify';
import { toastOptionsError } from '../helpers/config';
import { BikeStatus, Scooter, Rental } from './bike-types';

export const bikePerCity = async (city: string, token: string, status = '') : Promise<BikeStatus[]> =>
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
    catch(error) {
        const err = error as AxiosError<{message: string}>;
        toast.error(err?.response?.data.message, toastOptionsError)

    }
    console.log(data);
    return data;
}

  
export const allBikes = async ( token:string ) : Promise<Scooter[]> =>
{
        let data;
        try {
                const response = await axios.get(`${API_URL}/bike`, getHeader(token));
                data = response.data;
        }
        catch(error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message, toastOptionsError)

        }
        return data;
}

export const rentBike = async (bikeId: string, token: string) : Promise<AxiosResponse["data"]> =>
{
        let data: AxiosResponse["data"];
        try
        {
            const response = await axios.post(`${API_URL}/rental/bike/${bikeId}`, {}, getHeader(token));

            data = {... response.data, "statusCode": 200 };

                
        }
        catch(error) {
            const err = error as AxiosError<{message: string}>;
            toast.error(err?.response?.data.message, toastOptionsError)
            data = err?.response?.data;
        }
        return data;
}

export const returnBike = async (tripID: string | number | null, token: string) : Promise<AxiosResponse["data"]> =>
{
        let data: AxiosResponse["data"];


            try {
                    const response = await axios.post(`${API_URL}/rental/${tripID}/end`, {}, getHeader(token));
                    data = {... response.data, "statusCode": 200 };
            }
            catch(error) {

                const err = error as AxiosError<{message: string}>;
                toast.error(err?.response?.data.message, toastOptionsError)
                data = err?.response?.data;
            }
            return data;
}


export const allRentals = async (token: string): Promise<Rental[]> => {
    let data = [];
    try {
        const me = await axios.get(`${API_URL}/auth/me`, getHeader(token));
        const userId = me.data.githubId;
        const response = await axios.get(`${API_URL}/rental/customer/${userId}`, getHeader(token));
        data = response.data;
        console.log(data)
    } catch(error)
    {
        console.log(`No rentals found for user`);
        if (error instanceof AxiosError && error.response?.data?.message) {
            console.log(`Rentals error: ${error.response.data.message}`);
        }
    }
    return data;
}


export const bikeIdByFive = async (bikeIdFive: string, token: string): Promise<string | undefined> => {
    const data = await allBikes(token);
    const bike = data.find((item: Scooter) => item.id.startsWith(bikeIdFive.toLowerCase()));

    return bike?.id;
}

export const returnAllRentals = async (token: string): Promise<AxiosResponse | undefined> => {
    let data;
    try {
        const me = await axios.get(`${API_URL}/auth/me`, getHeader(token));
        const userId = me.data.githubId;
        data = await axios.post(`${API_URL}/rental/${userId}/end-all-travels`,{}, getHeader(token));
        
    } catch(error)
    {  
        if (error instanceof AxiosError && error.response?.data?.message) {
            toast.error(`Rentals were not returned: ${error.response.data.message}`, toastOptionsError);
        }
    }
    return data
}

// export function formatTimestamp(isoString: string) {
//     const date = new Date(isoString);
//     const yyyy = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, '0');
//     const dd = String(date.getDate()).padStart(2, '0');
//     const hh = String(date.getHours()).padStart(2, '0');
//     const min = String(date.getMinutes()).padStart(2, '0');
//     const ss = String(date.getSeconds()).padStart(2, '0');

//     return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
// }


// export function formatTimestamp(isoString: string): string | null {
//     const date = new Date(isoString);
//     const yyyy = date.getFullYear();
//     const mm = (date.getMonth() + 1).toString().padStart(2, '0');
//     const dd = date.getDate().toString().padStart(2, '0');
//     const hh = date.getHours().toString().padStart(2, '0');
//     const min = date.getMinutes().toString().padStart(2, '0');
//     const ss = date.getSeconds().toString().padStart(2, '0');

//     return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
// }

// export function formatTimestamp(isoString: string): string | null {
//     const date = new Date(isoString);

//     // if (isNaN(date.getTime())) {
//     //     console.error('Invalid date string');
//     //     return null;
//     // }

//     // Create options for formatting, including Sweden's time zone
//     const dateOptions: Intl.DateTimeFormatOptions = {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: false, // 24-hour format
//         timeZone: 'Europe/Stockholm' // Set Sweden's time zone
//     };

//     // Format the date using `Intl.DateTimeFormat` with the Sweden time zone
//     const formatter = new Intl.DateTimeFormat('sv-SE', dateOptions); // 'sv-SE' is the Swedish locale
//     const formattedDate = formatter.format(date);

//     // // Replace the commas and spaces to match the format YYYY-MM-DD HH:mm:ss
//     // const [datePart, timePart] = formattedDate.split(',').map(part => part.trim());
//     // // const formattedTimestamp = `${datePart} ${timePart.replace(/\//g, ':')}`;

//     return formattedDate;
// }