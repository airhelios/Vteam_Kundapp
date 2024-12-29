import {  useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { toastOptionsError, toastOptionsSuccess } from '../helpers/config';
import { rentBike } from '../helpers/bike-functions';
import { toast} from 'react-toastify';


type Props = {
  bikeId: string;
  showRentButton: boolean;
  setShowRentButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RentButtonMarker( { bikeId, showRentButton, setShowRentButton }: Props) {
    const { token } = useSelector((state: RootState) =>  state.auth);

    const rentBikeId = async (bikeId: string) => {

      const data = await rentBike(bikeId, token);
      console.log(await data.statusCode);
      if (data.statusCode === 200)
      {
        toast.success(`Bike ${bikeId.slice(0,5)} was rented`, toastOptionsSuccess);
        setShowRentButton(false);
      } else 
      {
        toast.error("Bike was not rented", toastOptionsError);
      }
    }
  
  return (
    <>
      {showRentButton &&  
        <div data-testid="rentbuttonmarker">
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
