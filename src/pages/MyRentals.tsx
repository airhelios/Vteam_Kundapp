
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
    <div>
    <div data-testid="my-rentals">Mina resor</div>
    <div onClick={() => setRefreshTrigger(refreshTrigger*-1)}>
    <ReturnAllRentalsButton className="text-white bg-blue-700 hover:bg-blue-800
      focus:ring-4 focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5
      me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
      dark:focus:ring-blue-800"/>
      </div>
      <ul>
          { rentals.map((rental, index) => (
          <li key={index} className="flex flex-wrap items-center gap-4 p-4 mb-4 bg-gray-50 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center">
              <span className="font-semibold text-gray-600 dark:text-gray-300">ID:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{rental.id}</span>
          </div>
          <div className="flex items-center">
              <span className="font-semibold text-gray-600 dark:text-gray-300">Start time:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{rental.startTime}</span>
          </div>
          {!rental.stopTime && 
          <div className="flex items-center">
              <ReturnRentButton tripID={rental.id}/>
              </div>
          } 
          {rental.stopTime && 
          <div className="flex items-center">
              <span className="font-semibold text-gray-600 dark:text-gray-300">Stop time:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{rental.stopTime ?? "Still going"}</span>
              <span className="font-semibold text-gray-600 dark:text-gray-300"> Kostnad:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{rental.cost} krosek</span>
          </div>
          }
          </li>
          )) }
      </ul>
    </div>
  )
}

