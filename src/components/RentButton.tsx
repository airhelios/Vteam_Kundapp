
import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { toastOptionsError, toastOptionsSuccess } from '../helpers/config';
import { rentBike, bikeIdByFive } from '../helpers/bike-functions';
import { toast} from 'react-toastify';


export default function RentBike( {  shortId = false, bikeId }: {'bikeId': string; shortId?: boolean}) {
    const { token } = useSelector((state: RootState) =>  state.auth);

    const [showButton, setShowButton] = useState(true);

    const rentBikeId = async (bikeId: string) => {

      if (shortId) {
        bikeId = await bikeIdByFive(bikeId, token);
      }
      const data = await rentBike(bikeId, token);
      if (data.statusCode !== 400)
      {

        toast.success(`Bike ${bikeId.slice(0,5)} was rented`, toastOptionsSuccess);
        setShowButton(false);
      } else 
      {
        toast.error("Bike was not rented", toastOptionsError);
      }
    }
  
  return (
    <>
      {showButton &&  
        <div>
            <button type="button" onClick={() => rentBikeId(bikeId)} className="text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
            me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800">
            Rent</button>
        </div>
      }
    </>
  )
}
