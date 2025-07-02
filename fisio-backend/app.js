require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('./models'); 

const usuarioRoutes = require('./routes/usuario.routes');
const pacienteRoutes = require('./routes/paciente.routes'); 
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

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
