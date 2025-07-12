const fs = require('fs');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.apiKey,
});

const generarSugerenciasMedicas = async (req, res) => {
  try {
    const filePath = req.file.path;
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const prompt = `Actúa como un fisioterapeuta. Analiza el siguiente historial clínico en JSON:\n\n${JSON.stringify(jsonData, null, 2)}\n\nProporciona recomendaciones clínicas detalladas.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    fs.unlinkSync(filePath); // elimina archivo temporal
    res.json({ sugerencias: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar el archivo o generar sugerencias' });
  }
};

module.exports = {
  generarSugerenciasMedicas,
};
