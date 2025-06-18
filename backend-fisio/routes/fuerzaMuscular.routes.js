const express = require('express');
const router = express.Router();
const controller = require('../controllers/fuerzaMuscular.controller');

router.get('/', controller.obtenerTodos);
router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
