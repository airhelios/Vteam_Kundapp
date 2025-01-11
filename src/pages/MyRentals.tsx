
import { useState, useEffect } from 'react';
import { RootState } from '../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { allRentals } from '../helpers/bike-functions';
import { Rental } from '../helpers/bike-types';
import ReturnRentButton from '../components/ReturnRentButton';
import ReturnAllRentalsButton from '../components/ReturnAllRentalsButton';
import { Badge } from "flowbite-react";
import Logo from '../components/Logo';
import { formatTimestamp } from '../helpers/bike-functions';

export default function MyRentals() {
  const { isLoggedIn, user, token } = useSelector((state: RootState) =>  state.auth);
  const [rentals, setRentals] = useState<Rental[]>([]);
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
      <Logo/>
    <div data-testid="my-rentals"><h1 className="text-2xl text-gray-900">
    Mina resor
</h1></div>
    <div onClick={() => setRefreshTrigger(refreshTrigger*-1)}>
    <ReturnAllRentalsButton className="w-full text-white my-5 bg-blue-500 hover:bg-blue-700
  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
  me-2 mb-2 focus:outline-none"/>
      </div>
      <ul>
          { rentals.map((rental, index) => (
          <li key={index} className="flex flex-col flex-wrap items-center gap-4 p-4 mb-4 bg-gray-50 rounded-lg shadow sm:flex-row">
          <div className="flex items-center ">
              <span className="font-semibold text-gray-600">ID:</span>
              <span className="ml-5 text-gray-800"><Badge color="indigo">{rental.id}</Badge></span>
          </div>
          <div className="flex items-center">
              <span className="font-semibold text-gray-600 ">Start time:</span>
              <span className="ml-5 text-gray-800"><Badge color="success">{formatTimestamp(rental.startTime)}</Badge></span>
          </div>
          {!rental.stopTime && 
              <ReturnRentButton tripID={rental.id}/>
          } 
          {rental.stopTime && 
            <>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 ">Stop time:</span>
                <span className="ml-5 text-gray-800"><Badge color="pink">{formatTimestamp(rental.stopTime) ?? "Still going"}</Badge></span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 "> Kostnad:</span>
                <span className="ml-5 text-gray-800"><Badge>{rental.cost.toFixed(2).replace('.', ',')} SEK</Badge></span>
              </div>
            </>
          }
          </li>
          )) }
      </ul>
    </div>
  )
}

