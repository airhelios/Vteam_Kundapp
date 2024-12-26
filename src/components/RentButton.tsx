
import { useState, useEffect, useDebugValue} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { toastOptionsError, toastOptionsSuccess } from '../helpers/config';
import { rentBike, returnBike } from '../helpers/bike-functions';
import { toast} from 'react-toastify';
import { setBikeId, setRentStatus, setStartTime, setUser, setTripID } from '../redux/slices/rentSlice';

export default function RentBike( { bikeId }: {'bikeId': string }) {
    // const bikeId = "f9f2e697-e9ce-4974-9799-9233323e9257";
    const { token, user } = useSelector((state: RootState) =>  state.auth);
    const dispatch = useDispatch();
    const { tripID, beingRent } = useSelector((state: RootState) =>  state.rent);

    const rentBikeId = async (bikeId: string) => {
      const data = await rentBike(bikeId, token);
      if (data.statusCode !== 400 && !beingRent)
      {
        dispatch(setBikeId(data.bike.id));
        dispatch(setRentStatus(true));
        dispatch(setStartTime(data.startTime));
        dispatch(setUser(user));
        dispatch(setTripID(data.id));
        
        toast.success(`Bike ${bikeId.slice(0,5)} was rented`, toastOptionsSuccess);
      } else 
      {
        toast.error("Bike was not rented", toastOptionsError);
      }
    }
  
    const returnBikeId = async () => {
      const data = await returnBike(tripID, token);
      if (data.statusCode !== 400 && beingRent)
      {
        dispatch(setBikeId(null));
        dispatch(setRentStatus(false));
        dispatch(setStartTime(null));
        dispatch(setUser(null));
        dispatch(setTripID(null));
        toast.success(`Bike ${bikeId.slice(0,5)} was returned`, toastOptionsSuccess);
      } else 
      {
        toast.error("Bike was not returned", toastOptionsError);
      }
    }


  return (
    <>
      {!beingRent &&  
        <div>
            <button type="button" onClick={() => rentBikeId(bikeId)} className="text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
            me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800">
            Rent</button>
        </div>
      }
      {beingRent && 
        <div>
          <button type="button" onClick={async () => await returnBikeId()} className="text-white bg-blue-700 hover:bg-blue-800
          focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
          me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
          dark:focus:ring-blue-800">
          Return</button>
        </div>
      }

    </>
  )
}
