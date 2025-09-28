import { useState, type FC } from "react";
import { useNavigate } from "react-router";
import ApiService from "../services/ApiService";
import axios from "axios";
import Loader from "../components/Loader";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const loginData = { email, password };
      const res = await ApiService.loginUser(loginData);

      if (res.status === 200) {
        await ApiService.saveToken(res.token);
        await ApiService.saveRole(res.role);
        setMessage(res.message);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al iniciar sesión: " + error);
      }
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {isLoading ? (
            <Loader size={24} cssClass="loading-wrapper" />
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Registrarse</a>
      </p>
    </div>
  );
};
export default Login;
