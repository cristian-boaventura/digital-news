"use client";

import RegionsModal from "./RegionsModal";
import { AiOutlineStar, AiOutlineFlag } from "react-icons/ai";
import { BsFilm } from "react-icons/bs";
import { BiChip } from "react-icons/bi";
import { RiHealthBookLine } from "react-icons/ri";
import { FaFootballBall } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { IoIosGlobe } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import NavLink from "./NavLink";

const categories = [
  { name: "business", icon: <VscGraph className="h-6 w-6" /> },
  { name: "technology", icon: <BiChip className="h-6 w-6" /> },
  { name: "entertainment", icon: <BsFilm className="h-6 w-6" /> },
  { name: "sports", icon: <FaFootballBall className="h-6 w-6" /> },
  { name: "science", icon: <ImLab className="h-6 w-6" /> },
  { name: "health", icon: <RiHealthBookLine className="h-6 w-6" /> },
];
const Sidebar = () => {
  const country = useSelector((state: RootState) => state.country);
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu h-full w-60 bg-base-100 p-4 sm:w-80">
          {user && (
            <NavLink
              href="/saved"
              linkName="Saved News"
              icon={<AiOutlineStar className="h-6 w-6" />}
            />
          )}
          {user && <div className="m-4 h-0.5  bg-gray-400 opacity-80" />}
          <NavLink
            href={`/${country.code}/general`}
            linkName={country.name}
            icon={<AiOutlineFlag className="h-6 w-6" />}
          />
          {categories.map((category, index) => (
            <NavLink
              key={index}
              href={`/${country.code}/${category.name}`}
              linkName={category.name}
              icon={category.icon}
            />
          ))}
          <div className="m-4 h-0.5  bg-gray-400 opacity-80" />
          <li>
            <a href="#my-modal-2" className="py-3 text-base text-current">
              <IoIosGlobe className="h-6 w-6" /> Select Region
            </a>
          </li>
        </ul>
      </div>
      <RegionsModal />
    </>
  );
};

export default Sidebar;
