import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateNavigation = () => {
  const { getUser } = useAuth();

  return getUser()
    ? <Navigate to="/home" />
    : <Navigate to="/signin" />
};