const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');


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



app.use(express.json());

// Importar rutas
const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);
const pacienteRoutes = require('./routes/paciente.routes');
app.use('/api/pacientes', pacienteRoutes);
const historiaRoutes = require('./routes/historia.routes');
app.use('/api/historias', historiaRoutes);
const antecedentesRoutes = require('./routes/antecedentes.routes');
app.use('/api/antecedentes', antecedentesRoutes);
const evalPosturalRoutes = require('./routes/evaluacionPostural.routes');
app.use('/api/evaluacion-postural', evalPosturalRoutes);
const fuerzaMuscularRoutes = require('./routes/fuerzaMuscular.routes');
app.use('/api/fuerza-muscular', fuerzaMuscularRoutes);
const pruebasEspecificasRoutes = require('./routes/pruebasEspecificas.routes');
app.use('/api/pruebas-especificas', pruebasEspecificasRoutes);
const seguimientoRoutes = require('./routes/seguimiento.routes');
app.use('/api/seguimientos', seguimientoRoutes);
const informeFinalRoutes = require('./routes/informeFinal.routes');
app.use('/api/informes-finales', informeFinalRoutes);
const firmasRoutes = require('./routes/firmasConsentimientos.routes');
app.use('/api/firmas', firmasRoutes);


// app.use('/api/usuarios', require('./routes/usuario.routes'));  ← luego lo agregamos

app.get('/', (req, res) => {
  res.send('API de fisioterapia funcionando');
});
/*
sequelize.authenticate()
  .then(() => console.log('✅ Conexión con PostgreSQL exitosa'))
  // Importar modelos
    const Usuario = require('./models/Usuario');

    // Sincronizar modelos con la base de datos
    sequelize.sync({ alter: true }) // También puedes usar { force: true } si deseas reiniciar las tablas
  .then(() => console.log('📄 Modelos sincronizados con la base de datos'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
*/
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión con PostgreSQL exitosa');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('📄 Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('❌ Error al conectar o sincronizar:', err);
  });
