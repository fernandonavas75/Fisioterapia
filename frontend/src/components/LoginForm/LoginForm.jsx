import { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mostrar, setMostrar] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        correo,
        contrasena
      });

      const { token, usuario } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      alert(`Bienvenido, ${usuario.nombre_completo}`);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <h2 className={styles.title}>Iniciar Sesión</h2>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type={mostrar ? 'text' : 'password'}
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className={styles.input}
          />
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setMostrar(!mostrar)}
          >
            {mostrar ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit" className={styles.button}>Ingresar</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
