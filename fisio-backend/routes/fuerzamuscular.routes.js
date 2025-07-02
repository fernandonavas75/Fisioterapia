const express = require('express');
const router = express.Router();
const fuerzaMuscularController = require('../controllers/fuerzamuscular.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, fuerzaMuscularController.crearFuerzaMuscular);
router.get('/', verificarTokenMiddleware, fuerzaMuscularController.obtenerFuerzasMusculares);
router.get('/:id', verificarTokenMiddleware, fuerzaMuscularController.obtenerFuerzaMuscularPorId);
router.put('/:id', verificarTokenMiddleware, fuerzaMuscularController.actualizarFuerzaMuscular);
router.delete('/:id', verificarTokenMiddleware, fuerzaMuscularController.eliminarFuerzaMuscular);

module.exports = router;
