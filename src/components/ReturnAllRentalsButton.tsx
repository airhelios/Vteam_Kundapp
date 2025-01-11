import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { toastOptionsError, toastOptionsSuccess } from '../helpers/config';
import { allRentals, returnAllRentals } from '../helpers/bike-functions';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function ReturnAllRentalsButton({ className } : {className: string}) {

    const { token } = useSelector((state: RootState) =>  state.auth);
    const returnAllBikes = async () => {
        const data = await returnAllRentals(token);
        await allRentals(token); //Had to add this because otherwise the rental data update is too slow
        try {
          if (data?.status === 201)
              {
                toast.success(`All rentals have been ended`, toastOptionsSuccess);
              } else 
              {
                toast.error("Bike was not returned", toastOptionsError);
              }
            } catch(error)
              {
                const axiosError = error as AxiosError;
                console.log(axiosError?.response?.data);
              }
      }


  return (
      <button data-testid="returnallrentalsbutton" type="button" onClick={async () => await returnAllBikes()} className={className}>
      Avsluta alla färder</button>
    )
}

export default ReturnAllRentalsButton;