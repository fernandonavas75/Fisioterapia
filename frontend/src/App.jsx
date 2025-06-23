import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/estudiante" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <EstudianteDashboard />
          </ProtectedRoute>
        } />

        <Route path="/HistoriaClinicaForm" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <HistoriaClinicaForm />
          </ProtectedRoute>
        } />

        <Route path="/HistoriaClinicaForm/:id" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <HistoriaClinicaForm />
          </ProtectedRoute>
        } />

        {}
        <Route path="/reportes" element={
          <ProtectedRoute allowedRoles={['estudiante']}>
            <ReportesPage />
          </ProtectedRoute>
        } />

        <Route path="/diagnostico-ia" element={
        <ProtectedRoute allowedRoles={['estudiante']}>
          <DiagnosticoIA />
        </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
