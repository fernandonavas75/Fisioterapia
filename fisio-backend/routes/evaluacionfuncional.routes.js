const express = require('express');
const router = express.Router();
const evaluacionFuncionalController = require('../controllers/evaluacionfuncional.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, evaluacionFuncionalController.crearEvaluacionFuncional);
router.get('/', verificarTokenMiddleware, evaluacionFuncionalController.obtenerEvaluacionesFuncionales);
router.get('/:id', verificarTokenMiddleware, evaluacionFuncionalController.obtenerEvaluacionFuncionalPorId);
router.put('/:id', verificarTokenMiddleware, evaluacionFuncionalController.actualizarEvaluacionFuncional);
router.delete('/:id', verificarTokenMiddleware, evaluacionFuncionalController.eliminarEvaluacionFuncional);

module.exports = router;
