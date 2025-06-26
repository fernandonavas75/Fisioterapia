// routes/historiaCompletaRoutes.js
const express = require('express');
const router = express.Router();
const { crearHistoriaCompleta } = require('../controllers/historiaCompletaController');

router.post('/historia-completa', crearHistoriaCompleta);

module.exports = router;
