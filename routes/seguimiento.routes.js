const express = require('express');
const router = express.Router();
const seguimientoController = require('../controllers/seguimiento.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, seguimientoController.crearSeguimiento);
router.get('/', verificarTokenMiddleware, seguimientoController.obtenerSeguimientos);
router.get('/:id', verificarTokenMiddleware, seguimientoController.obtenerSeguimientoPorId);
router.put('/:id', verificarTokenMiddleware, seguimientoController.actualizarSeguimiento);
router.delete('/:id', verificarTokenMiddleware, seguimientoController.eliminarSeguimiento);

module.exports = router;
