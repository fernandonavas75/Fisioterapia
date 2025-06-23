import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EstudianteDashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [historias, setHistorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(userData);

    // Cargar historias desde localStorage
    const data = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
    setHistorias(data);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const editarFicha = (index) => {
    localStorage.setItem('fichaAEditar', index);
    navigate('/historia_clinica');
  };

  const eliminarFicha = (index) => {
    if (window.confirm('¿Estás seguro de eliminar esta ficha?')) {
      const actualizadas = [...historias];
      actualizadas.splice(index, 1);
      setHistorias(actualizadas);
      localStorage.setItem('historiasClinicas', JSON.stringify(actualizadas));
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar col-md-2 bg-white border-end vh-100 p-3">
        <h5 className="text-center mb-4">Menú</h5>
        <a href="#" className="d-block py-2 text-primary">Historia Clínica</a>
        <a href="#" className="d-block py-2 text-primary">Diagnóstico IA</a>
        <a href="#" className="d-block py-2 text-primary">Reportes</a>
        <button className="btn btn-outline-danger mt-3 w-100" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* Main content */}
      <div className="col-md-10">
        <div className="top-bar bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
          <h4>Panel de Historias Clínicas</h4>
          <span className="text-muted">Usuario: {usuario?.nombre_completo || 'Cargando...'}</span>
        </div>

        <div className="p-4">
          <div className="d-flex justify-content-between mb-3">
            <input type="text" className="form-control w-50" placeholder="Buscar paciente por nombre..." />
            <button className="btn btn-success ms-3">+ Nueva Historia Clínica</button>
          </div>

          {historias.length > 0 ? (
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Paciente</th>
                  <th>Estudiante</th>
                  <th>Fecha</th>
                  <th>Sector</th>
                  <th>Diagnóstico</th>
                  <th>Ficha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historias.map((historia, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{historia.nombre || '-'}</td>
                    <td>{historia.evaluador || '-'}</td>
                    <td>{historia.fecha_evaluacion || '-'}</td>
                    <td>{historia.escuela || '-'}</td>
                    <td>{historia.diagnostico || '-'}</td>
                    <td>{historia.grado || '-'}</td>
                    <td>Registrada</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-1" onClick={() => editarFicha(index)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => eliminarFicha(index)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No se encontraron pacientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstudianteDashboard;
