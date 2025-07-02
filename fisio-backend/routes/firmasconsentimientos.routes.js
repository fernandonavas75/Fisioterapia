const express = require('express');
const router = express.Router();
const firmasConsentimientosController = require('../controllers/firmasconsentimientos.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, firmasConsentimientosController.crearFirmasConsentimientos);
router.get('/', verificarTokenMiddleware, firmasConsentimientosController.obtenerFirmasConsentimientos);
router.get('/:id', verificarTokenMiddleware, firmasConsentimientosController.obtenerFirmasConsentimientosPorId);
router.put('/:id', verificarTokenMiddleware, firmasConsentimientosController.actualizarFirmasConsentimientos);
router.delete('/:id', verificarTokenMiddleware, firmasConsentimientosController.eliminarFirmasConsentimientos);

module.exports = router;
