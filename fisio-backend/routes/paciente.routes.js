const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/paciente.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

//crud protegidas
router.post('/', verificarTokenMiddleware, pacienteController.crearPaciente);
router.get('/', verificarTokenMiddleware, pacienteController.obtenerPacientes);
router.get('/:id', verificarTokenMiddleware, pacienteController.obtenerPacientePorId);
router.get('/nombre/:nombre', verificarTokenMiddleware, pacienteController.obtenerPacientePorNombre);   
router.put('/:id', verificarTokenMiddleware, pacienteController.actualizarPaciente);
router.delete('/:id', verificarTokenMiddleware, pacienteController.eliminarPaciente);
// Busqueda especifica protegida
// router.get('/genero/:genero', verificarTokenMiddleware, pacienteController.obtenerPacientesPorGenero);
module.exports = router;