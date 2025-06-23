const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');
const PORT = process.env.PORT || 3000;
const iaRoutes = require('./routes/ia.routes');
// 👇 Middleware primero, antes de las rutas
app.use(cors()); // Permite peticiones desde el frontend (localhost:5173 en desarrollo)
app.use(express.json());

// Modelos
const {
  Usuario,
  Paciente,
  HistoriaClinica,
  Antecedentes,
  EvaluacionPostural,
  FuerzaMuscular,
  PruebasEspecificas,
  Seguimiento,
  InformeFinal,
  FirmasConsentimientos
} = require('./models/associations');

// Rutas
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/historias', require('./routes/historia.routes'));
app.use('/api/antecedentes', require('./routes/antecedentes.routes'));
app.use('/api/evaluacion-postural', require('./routes/evaluacionPostural.routes'));
app.use('/api/fuerza-muscular', require('./routes/fuerzaMuscular.routes'));
app.use('/api/pruebas-especificas', require('./routes/pruebasEspecificas.routes'));
app.use('/api/seguimientos', require('./routes/seguimiento.routes'));
app.use('/api/informes-finales', require('./routes/informeFinal.routes'));
app.use('/api/firmas', require('./routes/firmasConsentimientos.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/ia', iaRoutes);

app.get('/', (req, res) => {
  res.send('API de fisioterapia funcionando');
});

// Conexión y sincronización
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión con PostgreSQL exitosa');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('📄 Modelos sincronizados con la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar o sincronizar:', err);
  });
