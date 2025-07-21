// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('./models'); 

const usuarioRoutes = require('./routes/usuario.routes');
const pacienteRoutes = require('./routes/paciente.routes'); 
const historiaClinicaRoutes = require('./routes/historiaclinica.routes');
const sectorRoutes = require('./routes/sector.routes');
const antecedentesRoutes = require('./routes/antecedentes.routes');
const evaluacionPosturalRoutes = require('./routes/evaluacionpostural.routes');
const evaluacionFuncionalRoutes = require('./routes/evaluacionfuncional.routes');
const fuerzaMuscularRoutes = require('./routes/fuerzamuscular.routes');
const pruebasEspecificasRoutes = require('./routes/pruebasespecificas.routes');
const seguimientoRoutes = require('./routes/seguimiento.routes');
const informeFinalRoutes = require('./routes/informefinal.routes');
const firmasConsentimientosRoutes = require('./routes/firmasconsentimientos.routes');
const pacienteEstudianteRoutes = require('./routes/pacienteestudiante.routes');
const pacienteSectorRoutes = require('./routes/pacientesector.routes');
const openaiRoutes = require('./routes/openaiRoutes'); // Importar las rutas de OpenAI
const fichaCompletaRoutes = require('./routes/fichaCompleta.routes');
// Configuración de la aplicación Express
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/historias-clinicas', historiaClinicaRoutes);
app.use('/api/sectores', sectorRoutes);
app.use('/api/antecedentes', antecedentesRoutes);
app.use('/api/evaluacion-postural', evaluacionPosturalRoutes);
app.use('/api/evaluacion-funcional', evaluacionFuncionalRoutes);
app.use('/api/fuerza-muscular', fuerzaMuscularRoutes);
app.use('/api/pruebas-especificas', pruebasEspecificasRoutes);
app.use('/api/seguimientos', seguimientoRoutes);
app.use('/api/informes-finales', informeFinalRoutes);
app.use('/api/firmas-consentimientos', firmasConsentimientosRoutes);
app.use('/api/paciente-estudiante', pacienteEstudianteRoutes);
app.use('/api/paciente-sector', pacienteSectorRoutes);
app.use('/api/openai', openaiRoutes); // Usar las rutas de OpenAI
app.use('/api/ficha-completa', fichaCompletaRoutes);
// Ruta 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    url: req.originalUrl
  });
});


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexión a PostgreSQL establecida y modelos sincronizados');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error de conexión:', err));
