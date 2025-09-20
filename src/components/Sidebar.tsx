import { useEffect, useState, type FC } from "react";
import { Link } from "react-router";
import ApiService from "../services/ApiService";

const logout = () => {
  ApiService.logout();
};

const Sidebar: FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const resultAdmin: boolean = await ApiService.isAdmin();
      const resultIsAuth: boolean = await ApiService.isAuthenticated();
      setIsAdmin(resultAdmin);
      setIsAuth(resultIsAuth);
    };

    checkAdmin();
  }, []);

  return (
    <div className="sidebar">
      <h1 className="ims">IMS</h1>
      <ul className="nav-links">
        {isAuth && (
          <li>
            <Link to="/">Dashboard</Link>
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
