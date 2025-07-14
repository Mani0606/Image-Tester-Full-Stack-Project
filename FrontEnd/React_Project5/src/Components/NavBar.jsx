import React, { useState } from "react";
import { Menu, CircleUser, Lightbulb } from "lucide-react";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import { useMycontext } from "../APIs/ContextApi";
import DropdownMenu from "./DropdownMenu";

const NavBar = () => {
  const [isopen, setOpen] = useState(false);
  const { theme, SetTheme, token, currentUser } = useMycontext();

  const ThemeHandler = () => {
    if (theme === "white") {
      SetTheme("dark");
    } else {
      SetTheme("white");
    }
  };

  return (
    <nav className="flex flex-row items-center justify-between px-6 pt-5">
      {isopen && <SideBar opened={() => setOpen(!isopen)} />}

      <button
        onClick={() => setOpen(!isopen)}
        className="hover:bg-slate-500 hover:border hover:rounded-2xl p-1"
      >
        <Menu color={theme === "white" ? "black" : "white"} />
      </button>
      <NavLink to={"/"}>
        <button className="dark:text-white text-black text-xl font-bold">
          Image Tester
        </button>
      </NavLink>
      <div className="flex flex-row space-x-4 justify-center">
        {token ? (
          <>
            <DropdownMenu />
            <button onClick={ThemeHandler}>
              <Lightbulb color={theme === "white" ? "black" : "white"} />
            </button>
          </>
        ) : (
          <>
            <button onClick={ThemeHandler}>
              <Lightbulb color={theme === "white" ? "black" : "white"} />
            </button>
            <NavLink to={"/signup"}>
              <button className="py-1 px-2 md:py-3 md:px-6 bg-black dark:bg-white dark:text-black text-white rounded-3xl hover:opacity-35">
                SignUp
              </button>
            </NavLink>
            <NavLink to={"/login"}>
              <button className="py-1 px-2 md:py-3 md:px-6 bg-black dark:bg-white dark:text-black text-white rounded-3xl hover:opacity-35">
                Login
              </button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
