const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/paciente.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido

// Crear paciente
router.post('/', verificarTokenMiddleware, pacienteController.crearPaciente);

// Obtener todos los pacientes
router.get('/', verificarTokenMiddleware, pacienteController.obtenerPacientes);

// Obtener un paciente por ID
router.get('/:id', verificarTokenMiddleware, pacienteController.obtenerPacientePorId);

// Buscar pacientes por nombre o apellido
router.get('/buscar/nombre/:nombre', verificarTokenMiddleware, pacienteController.obtenerPacientePorNombre);

// Actualizar paciente por ID
router.put('/:id', verificarTokenMiddleware, pacienteController.actualizarPaciente);

// Eliminar paciente por ID
router.delete('/:id', verificarTokenMiddleware, pacienteController.eliminarPaciente);

module.exports = router;
