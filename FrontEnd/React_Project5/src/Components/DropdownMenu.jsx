import React, { useState, useEffect } from "react";
import { CircleUser } from "lucide-react";
import { useMycontext } from "../APIs/ContextApi";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");
  const { theme, SetToken, setCurrentUser } = useMycontext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("USER");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleSelect = (option) => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("CSRF_TOKEN");
    SetToken(null);
    setCurrentUser(null);
  };

  return (
    <div className="relative mt-2 text-left">
      {/* Button */}
      <button onClick={() => setIsOpen(!isOpen)}>
        <CircleUser color={theme === "white" ? "black" : "white"} />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute right-0  z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-3 px-2">
            <li className="border-b border-slate-400 cursor-pointer px-4 py-2 hover:bg-gray-200 text-sm text-gray-700">
              {user.email}
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-200 text-sm text-gray-700"
              onClick={handleSelect}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
