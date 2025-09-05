import { useState, type FC } from "react";
import { useNavigate } from "react-router";
import ApiService from "../services/ApiService";
import axios from "axios";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const res = await ApiService.loginUser(loginData);

      if (res.status === 200) {
        ApiService.saveToken(res.token);
        ApiService.saveRole(res.role);
        setMessage(res.message);
        navigate("/dashboard");
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

        <button type="submit">Iniciar sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Registrarse</a>
      </p>
    </div>
  );
};
export default Login;
