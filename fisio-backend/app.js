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
