
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

import { rentBike, returnBike, BikeStatus } from '../helpers/bike-functions';
import { ToastContainer, toast } from 'react-toastify';


export default function RentBike() {
    const bikeId = "1f135af9-413e-4924-8d90-447e0f0de657";
    const { token } = useSelector((state: RootState) =>  state.auth);
    const [ data, setData ] = useState<BikeStatus | null>(null);
    

  return (
    <>
      <div>
          <button type="button" onClick={async () => await rentBike(bikeId, token)} className="text-white bg-blue-700 hover:bg-blue-800
          focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
          me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
          dark:focus:ring-blue-800">
          Rent</button>
      </div>

      <div>
        <button type="button" onClick={async () => await returnBike(bikeId, token)} className="text-white bg-blue-700 hover:bg-blue-800
        focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
        me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
        dark:focus:ring-blue-800">
        Return</button>
      </div>
      <ToastContainer />
    </>
  )
}
