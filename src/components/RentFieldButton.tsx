import {  useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { toastOptionsError, toastOptionsSuccess } from '../helpers/config';
import { rentBike, bikeIdByFive } from '../helpers/bike-functions';
import { toast} from 'react-toastify';

type Props = {
  shortId: string;
}

export default function RentFieldButton( { shortId }: Props) {
    const { token } = useSelector((state: RootState) =>  state.auth);

    const rentBikeShortId = async (bikeId: string) => {
      try {
            bikeId = (await bikeIdByFive(bikeId, token));
      } catch (error)
      {
        console.log(error);
      }

      const data = await rentBike(bikeId, token);
      if (data.statusCode === 200)
      {

        toast.success(`Bike ${bikeId.slice(0,5)} was rented`, toastOptionsSuccess);
      } else 
      {
        toast.error(`Bike with id ${bikeId} was not rented`, toastOptionsError);
      }
    }
  
  return (
        <div data-testid="rentfieldbutton">
            <button type="button" onClick={() => rentBikeShortId(shortId)} className="text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
            me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800">
            Rent</button>
        </div>
  )
}
