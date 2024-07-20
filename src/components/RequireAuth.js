import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  return hasRole(allowedRoles) ? (
    <Outlet />
  ) : isAuthenticated() ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  // return auth?.roles?.find((role) => {
  //   console.log(auth?.roles);
  //   console.log(allowedRoles);
  //   return allowedRoles?.includes(role);
  // }) ? (
  //   <Outlet />
  // ) : auth?.user ? (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
