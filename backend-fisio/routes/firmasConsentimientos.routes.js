const express = require('express');
const router = express.Router();
const controller = require('../controllers/firmasConsentimientos.controller');

router.get('/', controller.obtenerTodas);
router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
