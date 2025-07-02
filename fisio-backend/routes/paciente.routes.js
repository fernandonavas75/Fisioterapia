const express = require('express');
const router = express.Router();
const historiaClinicaController = require('../controllers/historiaclinica.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// CRUD protegido
router.post(  '/',  verificarTokenMiddleware,historiaClinicaController.crearHistoriaClinica);

router.get( '/',verificarTokenMiddleware,historiaClinicaController.obtenerHistoriasClinicas);

router.get('/:id',verificarTokenMiddleware,historiaClinicaController.obtenerHistoriaClinicaPorId);

router.put('/:id',verificarTokenMiddleware,historiaClinicaController.actualizarHistoriaClinica);

router.delete( '/:id', verificarTokenMiddleware,historiaClinicaController.eliminarHistoriaClinica);

// Búsquedas específicas protegidas

// Buscar por paciente
router.get('/paciente/:id_paciente',verificarTokenMiddleware, historiaClinicaController.obtenerHistoriasPorPaciente);

// Buscar por estudiante
router.get('/estudiante/:id_estudiante', verificarTokenMiddleware,historiaClinicaController.obtenerHistoriasPorEstudiante);

// Buscar por sector
router.get('/sector/:id_sector',verificarTokenMiddleware,historiaClinicaController.obtenerHistoriasPorSector);

// Buscar por rango de fechas
// Ejemplo: /api/historias-clinicas/rango-fechas?fechaInicio=2023-01-01&fechaFin=2023-12-31
router.get('/rango-fechas',verificarTokenMiddleware,historiaClinicaController.obtenerHistoriasPorRangoFechas);

module.exports = router;
