"use client";
import { useState } from "react";

interface SearchBoxProps {
  onSearchSubmit: (search: string) => void;
}

export const SearchBox = ({ onSearchSubmit }: SearchBoxProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit(search);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="Search pokemon..."
          value={search}
          onChange={handleSearch}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};
