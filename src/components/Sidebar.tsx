import { useEffect, useState, type FC } from "react";
import { Link } from "react-router";
import ApiService from "../services/ApiService";

const logout = () => {
  ApiService.logout();
};

const Sidebar: FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => setIsOpen(!isOpen);

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
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h1 className="ims">IMS</h1>
        <ul className="nav-links">
          {isAuth && (
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}

          {isAuth && (
            <li>
              <Link to="/transactions" onClick={() => setIsOpen(false)}>
                Transacciones
              </Link>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link to="/categories" onClick={() => setIsOpen(false)}>
                Categorías
              </Link>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link to="/products" onClick={() => setIsOpen(false)}>
                Productos
              </Link>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link to="/suppliers" onClick={() => setIsOpen(false)}>
                Proveedores
              </Link>
            </li>
          )}

          {isAuth && (
            <li>
              <Link to="/purchases" onClick={() => setIsOpen(false)}>
                Compras
              </Link>
            </li>
          )}

          {isAuth && (
            <li>
              <Link to="/sales" onClick={() => setIsOpen(false)}>
                Ventas
              </Link>
            </li>
          )}

          {isAuth && (
            <li>
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                Perfil
              </Link>
            </li>
          )}

          {isAuth && (
            <li>
              <Link
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                to="/login"
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
