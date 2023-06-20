/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useTypedSelector } from "../services";
import {
  selectIsAuthenticated,
  selectLoggedUser,
} from "../services/slices/authSlice";

interface PrivateRouteProps {
  allowRoles: number[];
}

const PrivateRoute = ({ allowRoles }: PrivateRouteProps) => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const loggedUser = useTypedSelector(selectLoggedUser);
  const location = useLocation();

  return allowRoles.includes(loggedUser?.userRole as number) ? (
    <Outlet context={loggedUser} />
  ) : isAuthenticated ? (
    <Navigate to="/unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
