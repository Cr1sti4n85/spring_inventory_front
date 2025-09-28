import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import axios from "axios";
import type { User } from "../types";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchUserInfo = async () => {
      try {
        const userInfo = await ApiService.getLoggedInUserInfo();
        setUser(userInfo);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al registrar usuario: " + error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  //Method> to show message or errors
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return loading ? (
    <Loader size={60} cssClass="loader-container" />
  ) : (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="profile-page">
        {user && (
          <div className="profile-card">
            <h1>Hola, {user.name} 🥳</h1>
            <div className="profile-info">
              <div className="profile-item">
                <label>Nombre</label>
                <span>{user.name}</span>
              </div>
              <div className="profile-item">
                <label>Email</label>
                <span>{user.email}</span>
              </div>
              <div className="profile-item">
                <label>Teléfono</label>
                <span>{user.phoneNumber}</span>
              </div>
              <div className="profile-item">
                <label>Rol</label>
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Profile;
