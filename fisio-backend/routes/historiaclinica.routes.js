const express = require('express');
const router = express.Router();
const historiaClinicaController = require('../controllers/historiaclinica.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// Búsquedas específicas protegidas
router.get('/paciente/:id_paciente', verificarTokenMiddleware, historiaClinicaController.obtenerHistoriasPorPaciente);
router.get('/estudiante/:id_estudiante', verificarTokenMiddleware, historiaClinicaController.obtenerHistoriasPorEstudiante);
router.get('/sector/:id_sector', verificarTokenMiddleware, historiaClinicaController.obtenerHistoriasPorSector);
router.get('/rango-fechas', verificarTokenMiddleware, historiaClinicaController.obtenerHistoriasPorRangoFechas);

// CRUD protegido
router.post('/', verificarTokenMiddleware, historiaClinicaController.crearHistoriaClinica);
router.get('/', verificarTokenMiddleware, historiaClinicaController.obtenerHistoriasClinicas);
router.get('/:id', verificarTokenMiddleware, historiaClinicaController.obtenerHistoriaClinicaPorId);
router.put('/:id', verificarTokenMiddleware, historiaClinicaController.actualizarHistoriaClinica);
router.delete('/:id', verificarTokenMiddleware, historiaClinicaController.eliminarHistoriaClinica);

module.exports = router;
