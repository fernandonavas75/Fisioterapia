// controllers/openai.controller.js
const fs = require('fs');
const { OpenAI } = require('openai');
const { json } = require('sequelize');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generarSugerenciasMedicas = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ningún archivo' });
    }
    const jsonStr = req.file.buffer.toString('utf-8');

    let jsonData;
    try {
      jsonData = JSON.parse(jsonStr);
    } catch (e) {
      return res.status(400).json({ error: 'El archivo no contiene un JSON válido' });
    }

    const prompt = `Actúa como un fisioterapeuta. Analiza el siguiente historial clínico:\n\n${JSON.stringify(jsonData, null, 2)}\n\nDa recomendaciones.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    res.json({ sugerencias: completion.choices[0].message.content });
  } catch (error) {
    console.error("ERROR EN BACKEND:", error);
    res.status(500).json({ error: 'Error al procesar el archivo o generar sugerencias' });
  }
};

module.exports = {
  generarSugerenciasMedicas,
};
