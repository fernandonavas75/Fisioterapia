import axios from 'axios';


export const login = async (correo, contrasena) => {
  try {
   const response = await axios.post('/api/auth/login', {
      correo,
      contrasena,
    });

    const { token, usuario } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    return usuario;
  } catch (error) {
    throw error.response?.data?.mensaje || 'Error al iniciar sesión';
  }
};
