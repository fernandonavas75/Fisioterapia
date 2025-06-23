import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        correo,
        contrasena,
      });

      const { token, usuario } = response.data;

      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirigir según el rol
      if (usuario.rol === "admin") {
        navigate("/admin");
      } else if (usuario.rol === "estudiante") {
        navigate("/estudiante");
      } else {
        setError("Rol no autorizado");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="correo" className={styles.label}>
            Correo electrónico:
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={styles.input}
            required
          />

          <label htmlFor="contrasena" className={styles.label}>
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className={styles.input}
            required
          />

          <input type="submit" value="Ingresar" className={styles.button} />
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
