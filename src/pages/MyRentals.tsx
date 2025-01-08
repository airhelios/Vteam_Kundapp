
import { useState, useEffect } from 'react';
import { RootState } from '../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { allRentals } from '../helpers/bike-functions';
import ReturnRentButton from '../components/ReturnRentButton';
import ReturnAllRentalsButton from '../components/ReturnAllRentalsButton';
import { Badge } from "flowbite-react";
import Logo from '../components/Logo';


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

  function formatTimestamp(isoString: string) {
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

  return (
    <div>
      <Logo/>
    <div data-testid="my-rentals"><h1 className="text-2xl text-gray-900 dark:text-white">
    Mina resor
</h1></div>
    <div onClick={() => setRefreshTrigger(refreshTrigger*-1)}>
    <ReturnAllRentalsButton className="w-full text-white my-5 bg-blue-500 hover:bg-blue-700
  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
  dark:focus:ring-blue-800"/>
      </div>
      <ul>
          { rentals.map((rental, index) => (
          <li key={index} className="flex flex-col flex-wrap items-center gap-4 p-4 mb-4 bg-gray-50 rounded-lg shadow dark:bg-gray-700 sm:flex-row">
          <div className="flex items-center ">
              <span className="font-semibold text-gray-600 dark:text-gray-300">ID:</span>
              <span className="ml-5 text-gray-800 dark:text-white"><Badge color="indigo">{rental.id}</Badge></span>
          </div>
          <div className="flex items-center">
              <span className="font-semibold text-gray-600 dark:text-gray-300">Start time:</span>
              <span className="ml-5 text-gray-800 dark:text-white"><Badge color="success">{formatTimestamp(rental.startTime)}</Badge></span>
          </div>
          {!rental.stopTime && 
          <div className="flex items-center">
              <ReturnRentButton tripID={rental.id}/>
              </div>
          } 
          {rental.stopTime && 
            <>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 dark:text-gray-300">Stop time:</span>
                <span className="ml-5 text-gray-800 dark:text-white"><Badge color="pink">{formatTimestamp(rental.stopTime) ?? "Still going"}</Badge></span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 dark:text-gray-300"> Kostnad:</span>
                <span className="ml-5 text-gray-800 dark:text-white"><Badge>{rental.cost.toFixed(2).replace('.', ',')} SEK</Badge></span>
              </div>
            </>
          }
          </li>
          )) }
      </ul>
    </div>
  )
}

