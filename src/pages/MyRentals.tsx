import { GITHUB_URL } from '../helpers/config';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../redux/store/store';
import Logout from '../components/Logout';
import { Link, useNavigate } from 'react-router-dom';
import RentButton from '../components/RentButton';
import { useDispatch, useSelector } from 'react-redux';
import { allRentals } from '../helpers/bike-functions';

import ReturnRentButton from '../components/ReturnRentButton';

export default function MyRentals() {
  const { isLoggedIn, user, token } = useSelector((state: RootState) =>  state.auth);
  const [rentals, setRentals] = useState<any[]>([]); // Add proper type instead of any
  const navigate = useNavigate();


  if(!isLoggedIn) {
    navigate('/');
  }

  // const getRentals = async (user: string | null, token: string) => {

  //   let rentals
  //   if (user) {
  //     rentals = await allRentals(user, token);
  //   }
  //   console.log(rentals);
  //   return (<></>)
  // }

  useEffect(() => {
    const getRentals = async () => {
        if (user && token) {
            const rentalData = await allRentals(user, token);
            setRentals(rentalData);
            console.log(rentalData);
        }
    };
    
    getRentals();
}, [user, token]);

  
  return (
    <div>
    <div>MyRentals</div>
    <ul>
        {/* Render your rentals data here */}
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
             <span className="font-semibold text-gray-600 dark:text-gray-300">Trip still going</span>
             <ReturnRentButton tripID={rental.id}/>
             </div>
        }
        {rental.stopTime && 
         <div className="flex items-center">
             <span className="font-semibold text-gray-600 dark:text-gray-300">Stop time:</span>
             <span className="ml-2 text-gray-800 dark:text-white">{rental.stopTime ?? "Still going"}</span>
         </div>
        }
     </li>
        ))}
    </ul>
</div>
  )
}

