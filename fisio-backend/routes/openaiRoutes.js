const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload.middleware'); // ✅ correcto
const { generarSugerenciasMedicas } = require('../controllers/openai.controller'); // ✅ usa .controller

router.post('/sugerencias', upload.single('archivo'), generarSugerenciasMedicas);

module.exports = router;
