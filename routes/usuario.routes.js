const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

//Rutas Publicas
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);
router.post('/refresh-token', usuarioController.refreshToken);

//Busquedas especificas (protegidas)
router.get('/correo/:correo', verificarTokenMiddleware, usuarioController.obtenerUsuarioPorCorreo);
router.get('/cedula/:cedula', verificarTokenMiddleware, usuarioController.obtenerUsuarioPorCedula);
router.get('/nombre/:nombre', verificarTokenMiddleware, usuarioController.obtenerUsuarioPorNombre);

//CRUD (protegidas)
router.post('/', verificarTokenMiddleware, usuarioController.crearUsuario);
router.get('/', verificarTokenMiddleware, usuarioController.obtenerUsuarios);   
router.get('/:id', verificarTokenMiddleware, usuarioController.obtenerUsuarioPorId);
router.put('/:id', verificarTokenMiddleware, usuarioController.actualizarUsuario);
router.delete('/:id', verificarTokenMiddleware, usuarioController.eliminarUsuario); 
// This code defines the routes for user management in an Express application.
// It includes routes for creating, reading, updating, and deleting users, as well as handling  
// user login, logout, and token refresh functionalities.
// Additionally, it provides specific routes to retrieve users by email, ID number, or name.
// The routes are linked to a controller (`usuarioController`) that contains the logic for handling each request.
// The router is then exported for use in the main application file, allowing for modular route management
// and separation of concerns in the codebase.


module.exports = router;

