// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { History, X, Home } from "lucide-react";
import api from "../APIs/api";
import { useMycontext } from "../APIs/ContextApi";
import { NavLink, useNavigate } from "react-router-dom";

export default function SideBar({ opened }) {
  const [names, SetNames] = useState([]);
  const { Tapped, SetTapped } = useMycontext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch_names = async () => {
      const response = await api.get("/classify/getNames");
      if (response.status === 200 && response.data) {
        SetNames(response.data);
      }
    };
    fetch_names();
  }, []);
  return (
    <aside
      className="fixed left-0 top-0 z-40
                  h-screen dark:bg-zinc-900 bg-slate-300  dark:text-slate-100 text-black
                  flex flex-col
                  transition-all duration-300 w-55"
    >
      <button className="mt-5 place-self-end mx-3" onClick={opened}>
        <X />
      </button>
      <nav className="mt-2 flex-1 overflow-y-auto">
        <NavLink to={"/"}>
          <div
            className=" group flex items-center gap-4 rounded-md px-4 py-3
                       hover:bg-slate-800 transition-colors hover:text-white"
          >
            <Home size={22} />
            <p className="  dark:text-white text-black">Home</p>
          </div>
        </NavLink>

        <div className="list-none mx-4 my-5">
          <p className="border-y-1 dark:border-gray-600 text-left text-slate-500 py-5 my-auto ">
            Image History
          </p>
          <ul className="space-y-4 my-2 mx-1 overflow-x-scroll">
            {names.map((name) => (
              <li
                key={name.id}
                className="hover:bg-zinc-700"
                onClick={() => {
                  SetTapped(name.id);
                  navigate(`/details/${name.id}`);
                }}
              >
                {name.image_name}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
