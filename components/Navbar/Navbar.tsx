"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SearchInput, Sidebar } from "./";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  getStore,
  googleSignIn,
  userSignOut,
  authStateListener,
} from "@/utils/firebase.utils";
import { currentUser } from "@/store/states/user";
import { setFavorites } from "@/store/states/favorites";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [activeSearch, setActiveSearch] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  authStateListener((user) => {
    if (user) {
      dispatch(currentUser(user.uid));
    } else {
      dispatch(currentUser(""));
    }
  });

  const handleSignIn = async () => {
    try {
      const { uid } = await googleSignIn();
      dispatch(currentUser(uid));

      const stored = await getStore(uid);
      dispatch(setFavorites(stored?.favorites));
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await userSignOut();
      dispatch(currentUser(""));
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  const toggleSearchView = () => setActiveSearch(!activeSearch);

  const sidebarCheckbox = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLInputElement>;

  return (
    <div className="drawer">
      <input
        ref={sidebarCheckbox}
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content flex flex-col">
        <div
          className={`navbar sticky top-0 justify-between border-b-gray-300 bg-base-100 dark:border-b-0`}
        >
          <div className="flex">
            <label
              htmlFor="my-drawer-3"
              data-test="menu-btn"
              className="btn-ghost btn cursor-pointer place-content-center p-3"
            >
              <AiOutlineMenu className="h-6 w-6" />
            </label>

            <Link prefetch={false} href={"/"}>
              <button className="btn-ghost btn grid grid-rows-2 gap-x-0 text-lg normal-case text-current xs:flex">
                <p>News&nbsp;</p>
                <p>Digital</p>
              </button>
            </Link>
          </div>

          <div className="mr-4">
            {activeSearch ? (
              <SearchInput toggleSearchView={toggleSearchView} />
            ) : (
              <button
                className="btn-ghost btn-circle btn"
                onClick={toggleSearchView}
              >
                <AiOutlineSearch className="h-6 w-6" />
              </button>
            )}
            {user ? (
              <button onClick={handleSignOut} className="btn">
                Sign Out
              </button>
            ) : (
              <button onClick={handleSignIn} className="btn">
                Sign In
              </button>
            )}
          </div>
        </div>
        {children}
      </div>
      <Sidebar checkbox={sidebarCheckbox} />
    </div>
  );
};

export default Navbar;
