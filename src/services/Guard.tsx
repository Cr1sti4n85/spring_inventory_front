import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import ApiService from "./ApiService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = ApiService.isAuthenticated();
  const location = useLocation();
  return auth ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await ApiService.isAdmin();
      setIsAdmin(result);
    };

    checkAdmin();
  }, []);
  const location = useLocation();
  return isAdmin ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
