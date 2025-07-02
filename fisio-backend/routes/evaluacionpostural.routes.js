const express = require('express');
const router = express.Router();
const evaluacionPosturalController = require('../controllers/evaluacionpostural.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, evaluacionPosturalController.crearEvaluacionPostural);
router.get('/', verificarTokenMiddleware, evaluacionPosturalController.obtenerEvaluacionesPosturales);
router.get('/:id', verificarTokenMiddleware, evaluacionPosturalController.obtenerEvaluacionPosturalPorId);
router.put('/:id', verificarTokenMiddleware, evaluacionPosturalController.actualizarEvaluacionPostural);
router.delete('/:id', verificarTokenMiddleware, evaluacionPosturalController.eliminarEvaluacionPostural);

module.exports = router;
