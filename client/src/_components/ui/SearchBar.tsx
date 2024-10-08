import Image from "next/image";
import magnifyingGlass from "../../assets/magnifying-glass-backup-svgrepo-com.svg";

function SearchBar() {
  return (
    <div className="border border-zinc-400  flex rounded-lg focus-within:border-zinc-900 max-w-72 mx-auto">
      <input
        type="text"
        placeholder="Search by city"
        className="outline-none pl-2 rounded-l-lg w-full"
      />
      <button className="bg-rose-500 p-1 rounded-r-lg">
        <Image src={magnifyingGlass} alt="Magnifying glass image" width={25} />
      </button>
    </div>
  );
}

export default SearchBar;
