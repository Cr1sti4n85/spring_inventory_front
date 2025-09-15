import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import ApiService from "./ApiService";
import Loader from "../components/Loader";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await ApiService.isAuthenticated();
        setIsAuth(result);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);
  const location = useLocation();

  return isAuth === null ? (
    <Loader text="Cargando" />
  ) : isAuth ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const result = await ApiService.isAdmin();
        setIsAdmin(result);
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  const location = useLocation();

  return isAdmin === null ? (
    <Loader text="Cargando" />
  ) : isAdmin ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
