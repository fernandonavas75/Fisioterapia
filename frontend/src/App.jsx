import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EstudianteDashboard from './pages/EstudianteDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import HistoriaClinicaForm from './components/HistoriaClinicaTable';

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
            <HistoriaClinicaForm />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
