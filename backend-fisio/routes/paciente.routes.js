const express = require('express');
const router = express.Router();
const controller = require('../controllers/paciente.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');

router.get('/', verifyToken, controller.obtenerTodos); // Solo requiere estar logueado
router.post('/', verifyToken, verifyRole(['admin']), controller.crear); // Solo admin puede crear
router.put('/:id', verifyToken, controller.actualizar); // Cualquier usuario logueado
router.delete('/:id', verifyToken, verifyRole(['admin']), controller.eliminar); // Solo admin

module.exports = router;
// Este archivo define las rutas para manejar las operaciones CRUD de pacientes.
// Utiliza middlewares para verificar el token JWT y los roles de usuario.    