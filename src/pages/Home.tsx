import { GITHUB_URL } from '../helpers/config';
import { RootState } from '../redux/store/store';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RentBikeField from '../components/RentBikeField';
import ReturnAllRentalsButton from '../components/ReturnAllRentalsButton';
import Logo from '../components/Logo';

export default function Home() {
    const { isLoggedIn } = useSelector((state: RootState) =>  state.auth);

    const loginUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.href = GITHUB_URL;
    };

  return (

        <div data-testid="Home" className="min-h-screen w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-0 bg-white rounded-lg dark:bg-gray-800">
            <Logo/>
        {/* <ul className="my-4 space-y-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full"> */}
        <ul className={`my-4 space-y-3 grid grid-cols-1 gap-4 ${isLoggedIn ? "md:grid-cols-2 lg:grid-cols-3" : ""} w-full`}>

            { !isLoggedIn &&
                (
                <li className="flex justify-center">
                        <button type="submit" onClick={(e) => loginUser(e)} className="flex flex-row items-center gap-2 md:p-24 lg:p-24 p-8 text-base font-bold text-gray-900 rounded-lg bg-blue-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                        </svg>
                        <span className="flex-1 md:text-2xl lg:text-3xl xl:text-4xl whitespace-nowrap">Logga in</span>
                        </button>
                    </li>)
            }
            {isLoggedIn &&
            <>
                <li className="col-span-3">
                    <RentBikeField/>
                </li>
                <li className="col-span-3">
                    <Link to="/myrentals" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span className="flex-1 ms-3 whitespace-nowrap">Uthyrningar</span>
                    </Link>
                </li>
                <li className="col-span-3 sm:col-span-3 md:col-span-1 lg:col-span-1">
                    <Link to="/map/Göteborg" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span className="flex-1 ms-3 whitespace-nowrap">Göteborg</span>
                    </Link>
                </li>
                <li className="col-span-3 sm:col-span-3 md:col-span-1 lg:col-span-1">
                    <Link to="/map/Jönköping" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <span className="flex-1 ms-3 whitespace-nowrap">Jönköping</span>
                    </Link>
                </li>
                <li className="col-span-3 sm:col-span-3 md:col-span-1 lg:col-span-1">
                    <Link to="/map/Karlshamn" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        
                        <span className="flex-1 ms-3 whitespace-nowrap">Karlshamn</span>
                    </Link>
                </li>
                <li className="col-span-3">
                    <ReturnAllRentalsButton className="w-full items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"/>
                </li>
                <li className="col-span-3">

                <Logout/>
                </li>            
            </>
            }
            </ul>
        </div>
  )
};