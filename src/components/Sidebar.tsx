import { useEffect, useState, type FC } from "react";
import { Link } from "react-router";
import ApiService from "../services/ApiService";

const logout = () => {
  ApiService.logout();
};

const Sidebar: FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const isAuth: boolean = ApiService.isAuthenticated(); // si este es síncrono

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await ApiService.isAdmin();
      setIsAdmin(result);
    };

    checkAdmin();
  }, []);

  return (
    <div className="sidebar">
      <h1 className="ims">IMS</h1>
      <ul className="nav-links">
        {isAuth && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/transactions">Transacciones</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/categories">Categorías</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/products">Productos</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/suppliers">Proveedores</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/purchases">Compras</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/sales">Ventas</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Sidebar;
