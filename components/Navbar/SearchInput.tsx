"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { setSearchInput } from "@/store/states/searchInput";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  toggleSearchView: () => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { toggleSearchView } = props;
  const [isWritting, setIsWritting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const clearSearch = () => {
    setSearchValue("");
    setIsWritting(false);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;
    dispatch(setSearchInput(searchValue));
    router.push(`/search/${searchValue}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    e.target.value ? setIsWritting(true) : setIsWritting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute left-2 right-32 top-1.5`}
      onBlur={toggleSearchView}
    >
      <span
        className="btn-ghost btn-square btn absolute flex h-full items-center"
        onClick={toggleSearchView}
      >
        <AiOutlineArrowLeft className="h-6 w-6" />
      </span>
      <input
        type="text"
        placeholder="Search…"
        autoFocus
        className="input-bordered input h-[3.2rem] w-full pl-12 pr-12"
        value={searchValue}
        ref={inputRef}
        onChange={handleChange}
      />
      {isWritting && (
        <span
          className="btn-ghost btn-square btn absolute inset-y-0 right-0 flex h-full items-center"
          onClick={clearSearch}
        >
          <AiOutlineClose className="h-6 w-6" />
        </span>
      )}
    </form>
  );
};

export default SearchInput;
