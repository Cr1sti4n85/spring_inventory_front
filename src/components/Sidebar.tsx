import { useEffect, useState, type FC } from "react";
import { Link } from "react-router";
import { ApiService } from "../services/ApiService";

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
            <Link to="/dashboard">Dashboaard</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/transaction">Transactions</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/category">Category</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/product">Product</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/supplier">Supplier</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/purchase">Purchase</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/sell">Sell</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/profile">Profile</Link>
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
