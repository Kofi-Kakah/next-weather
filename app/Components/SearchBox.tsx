
import { IoSearch } from "react-icons/io5";
import { cn } from "../Utils/cn";

type props = {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBox({ className, onChange, onSubmit }: props) {
    return (
        <form className={cn("flex", className)} onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Search for a city..."
                className="flex-1 px-4 py-2 h-10 rounded-l-md border 
                border-gray-300 focus:outline-none focus:ring-2
                 focus:ring-blue-500"
                onChange={onChange}
            />
            <button type="submit" className="h-10 px-4 flex items-center 
            justify-center bg-blue-500 border border-blue-500 rounded-r-md
            hover:bg-blue-600 transition-colors">
                <IoSearch className="text-white text-2xl cursor-pointer" />
            </button>
        </form>
    )
}