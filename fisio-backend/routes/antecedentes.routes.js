const express = require('express');
const router = express.Router();
const antecedentesController = require('../controllers/antecedentes.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

router.post('/', verificarTokenMiddleware, antecedentesController.crearAntecedente);
router.get('/', verificarTokenMiddleware, antecedentesController.obtenerAntecedentes);
router.get('/:id', verificarTokenMiddleware, antecedentesController.obtenerAntecedentePorId);
router.put('/:id', verificarTokenMiddleware, antecedentesController.actualizarAntecedente);
router.delete('/:id', verificarTokenMiddleware, antecedentesController.eliminarAntecedente);

module.exports = router;
