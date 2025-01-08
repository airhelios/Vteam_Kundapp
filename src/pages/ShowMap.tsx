import Map from '../components/Map';

export default function ShowMap() {
  return (
    <div data-testid="show-map" className="relative flex-grow">

        <div className="relative z-0">
          <Map />
        </div>
        <span className="absolute top-0 right-0 z-50 bg-opacity-80 bg-white px-4 py-2 shadow-md rounded-md pointer-events-none">
        <div className="text-gray-700 font-semibold border-b border-gray-300 pb-1 mb-2">
            Zones
        </div>
          <div className="text-[#800080] flex items-center">
            <svg width="40" height="6" className="mr-2">
              <rect width="40" height="4" fill="#800080" />
            </svg> 
            Speed
          </div>

          <div className="text-[#028102] flex items-center">
            <svg width="40" height="6" className="mr-2">
              <rect width="40" height="4" fill="#028102" />
            </svg> 
            Parking
          </div>

          <div className="text-[#0000FF] flex items-center">
            <svg width="40" height="6" className="mr-2">
              <rect width="40" height="4" fill="#0000FF" />
            </svg> 
            Charging
          </div>

        </span>
    </div>
    
  )
};
