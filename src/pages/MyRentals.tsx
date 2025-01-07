
import { useState, useEffect } from 'react';
import { RootState } from '../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { allRentals } from '../helpers/bike-functions';
import ReturnRentButton from '../components/ReturnRentButton';
import ReturnAllRentalsButton from '../components/ReturnAllRentalsButton';

export default function MyRentals() {
  const { isLoggedIn, user, token } = useSelector((state: RootState) =>  state.auth);
  const [rentals, setRentals] = useState<any[]>([]);
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/');
    }
  },[isLoggedIn, navigate]);


  useEffect(() => {
    const getRentals = async () => {
        if (user && token) {

            setRentals([]);
            setTimeout(async () => {
              const rentalData = await allRentals(token);
              rentalData.reverse()
              setRentals(rentalData)}
              , 100);

        }
    };
    getRentals();
  }, [user, token, refreshTrigger]);



  return (
    <div className='max-w-[250px]'>
    <div>
    
    <div onClick={() => setRefreshTrigger(refreshTrigger*-1)}>
    <ReturnAllRentalsButton className="text-white bg-blue-700 hover:bg-blue-800
      focus:ring-4 focus:ring-blue-300font-large text-lg rounded-lg text-sm m-5 px-10 py-5
      dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
      dark:focus:ring-blue-800"/>
      </div>
      </div>
      <div data-testid="my-rentals">
        <h2 className="text-2xl font-bold text-gray-900"> Mina resor </h2> 
        </div>
      <ul>
          { rentals.map((rental, index) => (
          <li key={index} className="flex flex-col items-center gap-4 p-4 mb-6 bg-gray-50 rounded-lg shadow-xl dark:bg-gray-700">
          <div className="flex items-center bg-blue-400 p-2 rounded-lg text-white">
              <span className="font-semibold">Bike ID:</span>
              <span className="ml-2">{rental.id}</span>
          </div>
          <div className="flex items-center flex-col">
              <span className="font-semibold text-gray-600 dark:text-gray-300">Start time:</span>
              <span className="text-gray-800 dark:text-white">{rental.startTime}</span>
          </div>
          {!rental.stopTime && 
          <div className="flex items-center flex-col">
              <ReturnRentButton tripID={rental.id}/>
              </div>
          } 
          {rental.stopTime && 
          <div className="flex items-center flex-col">
              <span className="font-semibold text-gray-600 dark:text-gray-300">Stop time:</span>
              <span className="text-gray-800 dark:text-white">{rental.stopTime ?? "Still going"}</span>
              <span className="mt-2 font-semibold text-gray-600 dark:text-gray-300"> Kostnad:</span>
              {/* <span className="ml-2 text-gray-800 dark:text-white">{rental.cost} krosek</span> */}
              <span className="text-gray-800 dark:text-white">
              {parseFloat(rental.cost).toFixed(2)} kr
          </span>

          </div>
          }
          </li>
          )) }
      </ul>
    </div>
  )
}

