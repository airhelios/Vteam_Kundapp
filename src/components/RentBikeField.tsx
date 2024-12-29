import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import RentFieldButton from "./RentFieldButton";

export default function RentBikeField() {
    const [bikeId, setBikeId] = useState("");
    const { isLoggedIn } = useSelector((state: RootState) =>  state.auth);
    const [showField, setShowField] = useState(false);
    const [showRentButton, setShowRentButton] = useState(false);

    useEffect(() => {
        setShowField(false);
        setShowRentButton(false);
        if (isLoggedIn)
            {
            setShowField(true);
            if(bikeId.length>=5)
            {
                setShowRentButton(true);
            }
        }
    }, [isLoggedIn, bikeId])

    return showField && (
        <div>
            <label htmlFor="bike" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hur cykel: Cykel-ID (5 första tecken)</label>
            <input onChange={(e) => setBikeId(e.target.value)}
                type="bike" id="bike" className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500" placeholder="ab12c" required />
                { 
                    showRentButton &&
                    <RentFieldButton shortId={bikeId}/>
                }
        </div>)
}


{/* <div>Rent status: {beingRented.toString()}</div>
{ showRentInput && 

<div>
    <label htmlFor="bike" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hur cykel: Cykel-ID (5 första tecken)</label>
    <input onChange={(e) => setBikeId(e.target.value)}
        type="bike" id="bike" className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
    dark:focus:border-blue-500" placeholder="ab12c" required />
</div>
}
{   showRentButton &&
    <RentButton bikeId={bikeId} shortId={true} />
} */}