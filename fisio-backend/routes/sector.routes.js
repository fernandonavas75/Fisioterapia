const express = require('express');
const router = express.Router();
const sectorController = require('../controllers/sector.controller');
const { verificarTokenMiddleware } = require('../middlewares/auth.middleware');

// Búsqueda específica por nombre (protegida)
router.get('/buscar/nombre/:nombre', verificarTokenMiddleware, sectorController.buscarSectorPorNombre);

// CRUD protegido
router.post('/', verificarTokenMiddleware, sectorController.crearSector);
router.get('/', verificarTokenMiddleware, sectorController.obtenerSectores);
router.get('/:id', verificarTokenMiddleware, sectorController.obtenerSectorPorId);
router.put('/:id', verificarTokenMiddleware, sectorController.actualizarSector);
router.delete('/:id', verificarTokenMiddleware, sectorController.eliminarSector);

module.exports = router;
