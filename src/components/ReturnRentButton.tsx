import { useState, useEffect, useDebugValue} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { toastOptionsError, toastOptionsSuccess } from '../helpers/config';
import { rentBike, returnBike, bikeIdByFive } from '../helpers/bike-functions';
import { toast} from 'react-toastify';
import { setBikeId, setRentStatus, setStartTime, setUser, setTripID } from '../redux/slices/rentSlice';



function ReturnRentButton( {tripID}  : {tripID: 'string'}) {

    const { token } = useSelector((state: RootState) =>  state.auth);
    const dispatch = useDispatch();
    const returnBikeId = async (tripID: string) => {
        const data = await returnBike(tripID, token);
        if (data.statusCode !== 400)
        {
          dispatch(setBikeId(null));
          dispatch(setRentStatus(false));
          dispatch(setStartTime(null));
          dispatch(setUser(null));
          dispatch(setTripID(null));
          toast.success(`Bike with tripID ${tripID} was returned`, toastOptionsSuccess);
        } else 
        {
          toast.error("Bike was not returned", toastOptionsError);
        }
      }


  return (
    <button type="button" onClick={async () => await returnBikeId(tripID)} className="text-white bg-blue-700 hover:bg-blue-800
    focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
    me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
    dark:focus:ring-blue-800">
    Return</button>
  )
}

export default ReturnRentButton;