import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import ApiService from "./ApiService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  useEffect(() => {
    const checkAuth = async () => {
      const result = await ApiService.isAuthenticated();
      setIsAuth(result);
    };

    checkAuth();
  }, []);
  const location = useLocation();

  return isAuth ? (
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

  if (isAdmin === null) {
    return <div>Loading...</div>; // or a spinner
  }
  return isAdmin ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
