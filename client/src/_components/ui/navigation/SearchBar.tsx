import Image from "next/image";
import magnifyingGlass from "@/assets/magnifying-glass-backup-svgrepo-com.svg";

function SearchBar() {
  return (
    <div className="mx-auto flex max-w-72 rounded-lg border border-zinc-400 focus-within:border-zinc-900">
      <input
        type="text"
        placeholder="Search by city"
        className="w-full rounded-l-lg pl-2 outline-none"
      />
      <button className="rounded-r-lg bg-rose-500 p-1">
        <Image src={magnifyingGlass} alt="Magnifying glass image" width={25} />
      </button>
    </div>
  );
}

export default SearchBar;
