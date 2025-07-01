import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [rol, setRol] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser); // Convertir de string a objeto
        setRol(userObj.rol); // Obtener el rol del objeto
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
      }
    }
  }, []);

  return (
    <div className="sidebar flex-shrink-0 px-3 py-4" id="sidebarMenu">
      <div className="sidebar-header mb-4">
        {rol?.toUpperCase()}
        <br />
        <span className="badge bg-light text-dark mt-2">
          {rol === 'admin' ? 'ADMIN' : rol === 'estudiante' ? 'ESTUDIANTE' : 'USUARIO'}
        </span>
      </div>

      {rol === 'admin' && (
        <>
          <Link to="/dashboard" className="sidebar-link active">
            <i className="bi bi-house-door me-2"></i>Inicio
          </Link>
          <Link to="/estudiantes" className="sidebar-link">
            <i className="bi bi-mortarboard me-2"></i>Estudiantes
          </Link>
          <Link to="/pacientes" className="sidebar-link">
            <i className="bi bi-person-lines-fill me-2"></i>Pacientes
          </Link>
          <Link to="/fichas" className="sidebar-link">
            <i className="bi bi-journal-medical me-2"></i>Fichas
          </Link>
          <Link to="/informe" className="sidebar-link">
            <i className="bi bi-clipboard-data me-2"></i>Informe
          </Link>
        </>
      )}

      {rol === 'estudiante' && (
        <>
          <Link to="/pacientes" className="sidebar-link">
            <i className="bi bi-person-heart me-2"></i>Mis Pacientes
          </Link>
          <Link to="/fichas" className="sidebar-link">
            <i className="bi bi-journal-text me-2"></i>Mis Fichas
          </Link>
        </>
      )}

      <Link to="/" className="sidebar-link text-danger mt-3">
        <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
      </Link>
    </div>
  );
};

export default Sidebar;
