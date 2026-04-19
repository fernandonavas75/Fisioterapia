const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const{generarToken, verificarToken} = require('../utils/jwt');
const { Op } = require('sequelize');

// CREATE
exports.crearUsuario = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      cedula,
      correo,
      rol,
      contrasena,
      conexion
    } = req.body;

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await Usuario.create({
      nombres,
      apellidos,
      cedula,
      correo,
      rol,
      contrasena: hash,
      conexion
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
};

// READ ALL
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// READ ONE
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
};

// UPDATE
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      cedula,
      correo,
      rol,
      contrasena,
      conexion
    } = req.body;

    let datosUpdate = {
      nombres,
      apellidos,
      cedula,
      correo,
      rol,
      conexion
    };

    if (contrasena) {
      const hash = await bcrypt.hash(contrasena, 10);
      datosUpdate.contrasena = hash;
    }

    const [updated] = await Usuario.update(datosUpdate, {
      where: { id_usuario: id }
    });

    if (updated === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};

// DELETE
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Usuario.destroy({
      where: { id_usuario: id }
    });

    if (deleted === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};
// LOGIN
exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!isMatch) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Aquí podrías generar un token JWT si es necesario

    const payload = {
      id_usuario: usuario.id_usuario,
        nombres: usuario.correo,
         rol: usuario.rol
    };
    const token = generarToken(payload);

    res.json({ mensaje: 'Login exitoso', usuario, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
}
// LOGOUT
exports.logout = async (req, res) => {
  try {
    // Aquí podrías invalidar el token JWT o realizar alguna acción de cierre de sesión
    res.json({ mensaje: 'Logout exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cerrar sesión' });
  }
}
// REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  try {
    // Aquí podrías generar un nuevo token JWT si es necesario
    res.json({ mensaje: 'Token actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar token' });
  }
}
// OBTENER USUARIO POR CORREO
exports.obtenerUsuarioPorCorreo = async (req, res) => {
    try {
        const { correo } = req.params;
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener usuario por correo' });
    }
    }
// OBTENER USUARIO POR CEDULA
exports.obtenerUsuarioPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;
        const usuario = await Usuario.findOne({ where: { cedula } });
        if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener usuario por cédula' });
    }
}
// OBTENER USUARIO POR NOMBRE
exports.obtenerUsuarioPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const usuarios = await Usuario.findAll({
            where: {
                [Op.or]: [
                    { nombres: { [Op.iLike]: `%${nombre}%` } },
                    { apellidos: { [Op.iLike]: `%${nombre}%` } }
                ]
            }
        });
        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron usuarios con ese nombre' });
        }
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener usuario por nombre' });
    }
}
