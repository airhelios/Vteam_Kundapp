import { useDispatch } from 'react-redux';
import { setLoggedInOut, setCurrentUser, setToken, setRole } from '../redux/slices/authLogin';
import { setBikeId, setRentStatus, setStartTime, setUser, setTripID } from '../redux/slices/rentSlice';
import { useNavigate } from "react-router-dom";

export default function Logout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutUser = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(setLoggedInOut(false));
        dispatch(setCurrentUser(null));
        dispatch(setToken(''));
        dispatch(setRole('customer'));
        dispatch(setBikeId(null));
        dispatch(setRentStatus(false));
        dispatch(setStartTime(null));
        dispatch(setUser(null));
        dispatch(setTripID(null));
        navigate('/')
        console.log("Header here");
    }
  return (
        <div data-testid="logout-test">
            <a href="#" onClick={(e) => logOutUser(e)} className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mx-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Logga ut</a>
        </div>
  )
}
