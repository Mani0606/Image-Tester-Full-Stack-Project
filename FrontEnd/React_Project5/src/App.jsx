import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Uplodes from "./Components/Uplodes";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useMycontext } from "./APIs/ContextApi";
import Result from "./Components/Result";
import PreviousResult from "./Components/PreviousResult";
import ProtectedRoutes from "./Components/ProtectedRoutes";

function App() {
  const { theme, SetTheme } = useMycontext();
  return (
    <div
      className={`{fixed min-w-full h-screen bg-sky-50 dark:bg-zinc-800 ${theme}`}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Uplodes />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/result" element={<Result />} />
          <Route path="/details/:id" element={<PreviousResult />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
