const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historia.controller');

router.get('/', historiaController.obtenerTodas);
router.post('/', historiaController.crear);
router.put('/:id', historiaController.actualizar);
router.delete('/:id', historiaController.eliminar);

module.exports = router;
