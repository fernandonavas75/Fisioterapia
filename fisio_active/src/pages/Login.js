import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/usuarios/login", {
        correo: usuario,
        contrasena: clave,
      });

      const { token, usuario: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(userData));

      if (userData.rol === 'admin') {
        navigate('/coord');
      } else if (userData.rol === 'estudiante') {
        navigate('/est');
      } else {
        setError('Rol no autorizado');
      }
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Correo electrónico"
          onChange={e => setUsuario(e.target.value)}
          required
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Contraseña"
          onChange={e => setClave(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">Iniciar sesión</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
