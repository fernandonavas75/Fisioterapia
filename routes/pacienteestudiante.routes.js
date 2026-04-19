const express = require('express');
const router = express.Router();
const pacienteEstudianteController = require('../controllers/pacienteestudiante.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post('/', verificarTokenMiddleware, pacienteEstudianteController.crearPacienteEstudiante);
router.get('/', verificarTokenMiddleware, pacienteEstudianteController.obtenerTodos);
router.get('/:id', verificarTokenMiddleware, pacienteEstudianteController.obtenerPorId);
router.put('/:id', verificarTokenMiddleware, pacienteEstudianteController.actualizar);
router.delete('/:id', verificarTokenMiddleware, pacienteEstudianteController.eliminar);

router.get('/por-paciente/:id', verificarTokenMiddleware, pacienteEstudianteController.obtenerEstudiantePorPaciente)
module.exports = router;
