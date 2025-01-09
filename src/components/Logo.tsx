import logo from '../assets/images/Logo.webp';

export default function Logo() {
  return (
    <div className="flex flex-row overflow-hidden bg-purple-100 rounded-md" data-testid="logo">
      <div className="flex items-center justify-around mx-auto">
        <img src={logo} className="ml-3 h-6 sm:h-9" alt="Svenska Elsparkcyklar AB logo" />
            <div className="max-w-full flex-shrink-0 px-4 text-center mx-0 max-w-3xl">
                <h1 className="mt-5 text-gray-700 mb-5 font-bold tracking-tight text-2xl">
                    Kundapp Svenska Elsparkcyklar AB
                </h1>
            </div>
        </div>
    </div>
  )
}
