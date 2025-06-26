import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaPacientes from './pages/ListaPacientes';
import ActualizarPaciente from './pages/ActualizarPaciente';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EstudianteDashboard from './pages/EstudianteDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import HistoriaClinicaForm from './pages/HistoriaClinicaForm';
import ReportesPage from './pages/ReportesPage';
import DiagnosticoIA from './pages/DiagnosticoIA';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Estudiante */}
        <Route path="/estudiante" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <EstudianteDashboard />
          </ProtectedRoute>
        } />

        {/* Historia Clínica */}
        <Route path="/historia-clinica/nueva" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <HistoriaClinicaForm />
          </ProtectedRoute>
        } />

        <Route path="/historia-clinica/editar/:id" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <HistoriaClinicaForm />
          </ProtectedRoute>
        } />

        {/* Reportes */}
        <Route path="/reportes" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <ReportesPage />
          </ProtectedRoute>
        } />

        {/* Diagnóstico con IA */}
        <Route path="/diagnostico-ia" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <DiagnosticoIA />
          </ProtectedRoute>
        } />

        {/* Pacientes */}
        <Route path="/lista-pacientes" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <ListaPacientes />
          </ProtectedRoute>
        } />

        <Route path="/editar-paciente/:id" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <ActualizarPaciente />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
