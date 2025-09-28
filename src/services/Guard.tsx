import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import ApiService from "./ApiService";
import Loader from "../components/Loader";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const result = await ApiService.isAuthenticated();
      setIsAuth(result);
    } catch {
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);

    checkAuth();
  }, []);
  if (isLoading) {
    return <Loader size={60} cssClass="loader-container" />;
  }

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdmin = async () => {
    try {
      const result = await ApiService.isAdmin();
      setIsAdmin(result);
    } catch {
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);

    checkAdmin();
  }, []);

  const location = useLocation();

  if (isLoading) {
    return <Loader size={60} cssClass="loader-container" />;
  }

  return isAdmin ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
