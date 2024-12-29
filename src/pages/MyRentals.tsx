
import { useState, useEffect } from 'react';
import { RootState } from '../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { allRentals } from '../helpers/bike-functions';
import ReturnRentButton from '../components/ReturnRentButton';

export default function MyRentals() {
  const { isLoggedIn, user, token } = useSelector((state: RootState) =>  state.auth);
  const [rentals, setRentals] = useState<any[]>([]); // Add proper type instead of any
  const navigate = useNavigate();


  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/');
    }
  },[isLoggedIn, navigate]);


  useEffect(() => {
    const getRentals = async () => {
        if (user && token) {
            const rentalData = await allRentals(token);
            setRentals(rentalData.reverse());
            console.log(rentalData);
        }
    };
    getRentals();
  }, [user, token]);

  return (
    <div>
    <div data-testid="my-rentals">MyRentals</div>
      <ul>
          {rentals.map((rental, index) => (
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
          ))}
      </ul>
    </div>
  )
}

