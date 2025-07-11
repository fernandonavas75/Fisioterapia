const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { generarSugerenciasMedicas } = require('../controllers/openai.controller');

router.post('/sugerencias', upload.single('archivo'), generarSugerenciasMedicas);

module.exports = router;
// This code defines a route for generating medical suggestions using OpenAI's API.
// It uses multer middleware to handle file uploads, specifically JSON files.
// The route listens for POST requests at '/api/openai/sugerencias' and calls the `generarSugerenciasMedicas` function from the controller when a file is uploaded. 
// The uploaded file is expected to be a JSON file, and the route processes it to generate suggestions based on its content.
// The `upload.single('archivo')` middleware handles the file upload, and the file is accessible in the request object as `req.file`.
// The `generarSugerenciasMedicas` function is responsible for interacting with the OpenAI API to generate the medical suggestions based on the uploaded file's content.
// The router is then exported for use in the main application file, allowing it to be mounted on a specific path (e.g., '/api/openai').
// This modular approach helps keep the code organized and maintainable, separating the routing logic from the business logic in the controller.
