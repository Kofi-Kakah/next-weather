import { IoLocationOutline } from "react-icons/io5";
import { MdMyLocation, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

interface NavbarProps {
  onSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentLocation?: string;
}

export default function Navbar({ onSearch, onChange, currentLocation = "Current Location" }: NavbarProps) {
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(
            `Location: ${position.coords.latitude}, ${position.coords.longitude}`
          );
        },
        () => {
          alert("Unable to get your location");
        }
      );
    }
  };

  return (
    <nav className="shadow-md sticky top-0 left-0 bg-white z-50">
      <div className="w-full flex items-center justify-between gap-2 md:gap-4 max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-0 md:h-[80px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-1 md:gap-2 flex-shrink-0">
          <h2 className="text-gray-500 text-xl md:text-3xl">Weather</h2>
          <MdWbSunny className="text-yellow-500 text-xl md:text-3xl md:mt-2" />
        </div>

        {/* Search Box - Always Visible */}
        <div className="flex-1 min-w-0 max-w-xs md:max-w-md">
          <SearchBox onSubmit={onSearch} onChange={onChange} />
        </div>

        {/* Location Info - Always Visible */}
        <div className="flex items-center justify-center gap-1 md:gap-2 flex-shrink-0">
          <button
            onClick={handleLocationClick}
            className="hover:opacity-80 transition-opacity"
            title="Get current location"
          >
            <MdMyLocation className="text-gray-500 text-lg md:text-2xl cursor-pointer" />
          </button>
          <IoLocationOutline className="text-gray-500 text-lg md:text-2xl" />
          <p className="text-slate-900/80 text-xs md:text-sm whitespace-nowrap">{currentLocation}</p>
        </div>
      </div>
    </nav>
  );
}