import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import EstDashboard from './pages/EstDashboard';
import CoordDashboard from './pages/CoordDashboard';

import Pacientes from './pages/Pacientes';
import Fichas from './pages/Fichas';
import Estudiantes from './pages/Estudiantes';
import Informe from './pages/Informe';
import Layout from './components/Layout';
import AgendarFicha from './pages/AgendarFicha'; // o como se llame tu vista
import AgregarEstudiantes from './pages/AgregarEstudiantes';


function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboards con layout */}
        <Route path="/est" element={<Layout><EstDashboard /></Layout>} />
        <Route path="/coord" element={<Layout><CoordDashboard /></Layout>} />

        {/* Rutas comunes y por rol, todas con layout */}
        <Route path="/pacientes" element={<Layout><Pacientes /></Layout>} />
        <Route path="/fichas" element={<Layout><Fichas /></Layout>} />
        <Route path="/estudiantes" element={<Layout><Estudiantes /></Layout>} />
        <Route path="/informe" element={<Layout><Informe /></Layout>} />
        <Route path="/agendar" element={<Layout><AgendarFicha /></Layout>} />
        <Route path="/agregar-estudiantes" element={<Layout><AgregarEstudiantes /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
