const express = require('express');
const router = express.Router();
const pruebasController = require('../controllers/pruebasespecificas.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, pruebasController.crearPruebasEspecificas);
router.get('/', verificarTokenMiddleware, pruebasController.obtenerPruebasEspecificas);
router.get('/:id', verificarTokenMiddleware, pruebasController.obtenerPruebasEspecificasPorId);
router.put('/:id', verificarTokenMiddleware, pruebasController.actualizarPruebasEspecificas);
router.delete('/:id', verificarTokenMiddleware, pruebasController.eliminarPruebasEspecificas);

module.exports = router;
