import React from "react";
import { useMycontext } from "../APIs/ContextApi";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useMycontext();
  return <>{token ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoutes;
