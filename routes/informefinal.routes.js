const express = require('express');
const router = express.Router();
const informeFinalController = require('../controllers/informefinal.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, informeFinalController.crearInformeFinal);
router.get('/', verificarTokenMiddleware, informeFinalController.obtenerInformesFinales);
router.get('/:id', verificarTokenMiddleware, informeFinalController.obtenerInformeFinalPorId);
router.put('/:id', verificarTokenMiddleware, informeFinalController.actualizarInformeFinal);
router.delete('/:id', verificarTokenMiddleware, informeFinalController.eliminarInformeFinal);

module.exports = router;
