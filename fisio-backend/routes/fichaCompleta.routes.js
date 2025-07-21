const express = require('express');
const router = express.Router();
const { crearFichaCompleta } = require('../controllers/fichaCompleta.controller');

router.post('/guardar-ficha', crearFichaCompleta);

module.exports = router;
