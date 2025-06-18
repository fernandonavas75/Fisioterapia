const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/paciente.controller');

router.get('/', pacienteController.obtenerTodos);
router.post('/', pacienteController.crear);
router.put('/:id', pacienteController.actualizar);
router.delete('/:id', pacienteController.eliminar);

module.exports = router;
