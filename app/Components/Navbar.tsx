import { IoLocationOutline } from "react-icons/io5";
import { MdMyLocation, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <nav className="shadow-md  sticky top-0 left-0 bg-white z-50 ">
      <div className="h-[80px] w-full flex items-center justify-between max-w-7xl mx-auto px-4">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className="text-yellow-500 text-3xl mt-2" />
        </p>

      <section className="flex items-center justify-center gap-4">
        <MdMyLocation className="text-gray-500 text-2xl cursor-pointer hover:opacity-80" />
        <IoLocationOutline className="text-gray-500 text-2xl cursor-pointer hover:opacity-80" />
        <p className="text-slate-900/80 text-sm">Current Location</p>
        <div >
          <SearchBox />
        </div>
      </section>
      </div>
     
    </nav>
  );
}