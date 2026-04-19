const express = require('express');
const router = express.Router();
const pacienteSectorController = require('../controllers/pacientesector.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, pacienteSectorController.crearPacienteSector);
router.get('/', verificarTokenMiddleware, pacienteSectorController.obtenerTodos);
router.get('/:id', verificarTokenMiddleware, pacienteSectorController.obtenerPorId);
router.put('/:id', verificarTokenMiddleware, pacienteSectorController.actualizar);
router.delete('/:id', verificarTokenMiddleware, pacienteSectorController.eliminar);

module.exports = router;
