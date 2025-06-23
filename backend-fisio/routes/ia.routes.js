const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config(); // Cargar variables de entorno



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/diagnostico', async (req, res) => {
  const { sintomas } = req.body;
  console.log("Síntomas recibidos:", sintomas); // ⬅ depuracion
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Actúa como un fisioterapeuta profesional.' },
        { role: 'user', content: `Analiza estos síntomas y da un diagnóstico: ${sintomas}` }
      ]
    });

    res.json({ respuesta: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener diagnóstico IA.' });
  }
});

module.exports = router;
