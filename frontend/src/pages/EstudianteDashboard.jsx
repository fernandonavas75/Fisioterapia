import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/TopBar'
import 'bootstrap/dist/css/bootstrap.min.css';

const EstudianteDashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [historias, setHistorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(userData);

    // Obtener historias clínicas desde el backend
    axios.get("http://localhost:3000/api/historias")
      .then(res => setHistorias(res.data))
      .catch(err => console.error("Error al obtener historias:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const eliminarFicha = async (id) => {
  if (window.confirm('¿Estás seguro de eliminar esta historia clínica?')) {
    try {
      await axios.delete(`http://localhost:3000/api/historias/${id}`);
      setHistorias(historias.filter(historia => historia.id_historia !== id));
    } catch (error) {
      console.error("Error al eliminar historia:", error);
    }
  }
};
const handleBusqueda = (e) => {
  setBusqueda(e.target.value.toLowerCase());
};

const editarFicha = (id) => {
  localStorage.setItem("historiaAEditar", id); // Guardamos el ID de la historia a editar
  navigate("/HistoriaClinicaForm");            // Redirige al formulario
};

const historiasFiltradas = historias.filter(historia => {
  const nombreCompleto = `${historia.paciente?.nombres} ${historia.paciente?.apellidos}`.toLowerCase();
  return nombreCompleto.includes(busqueda);
});


 return (
  <div className="d-flex">
    <Sidebar />

    <div className="col-md-10">
      <div className="top-bar bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
        <h4>Panel de Historias Clínicas</h4>
        <span className="text-muted">Usuario: {usuario?.nombre_completo || 'Cargando...'}</span>
      </div>

      <div className="p-4">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Buscar paciente por nombre..."
            value={busqueda}
            onChange={handleBusqueda}
          />
          <button
            className="btn btn-success ms-3"
            onClick={() => navigate("/HistoriaClinicaForm")}
          >
            + Nueva Historia Clínica
          </button>
        </div>

        {historiasFiltradas.length > 0 ? (
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
              {historiasFiltradas.map((historia, index) => (
                <tr key={historia.id_historia}>
                  <td>{index + 1}</td>
                  <td>{historia.paciente?.nombres} {historia.paciente?.apellidos}</td>
                  <td>{historia.estudiante?.nombre_completo}</td>
                  <td>{historia.fecha_evaluacion?.split('T')[0]}</td>
                  <td>{historia.paciente?.escuela || '-'}</td>
                  <td>{historia.diagnostico_preliminar || '-'}</td>
                  <td>{historia.paciente?.grado || '-'}</td>
                  <td>Registrada</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => navigate(`/HistoriaClinicaForm/${historia.id_historia}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarFicha(historia.id_historia)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No se encontraron historias clínicas.</p>
        )}
      </div>
    </div>
  </div>
);
}
export default EstudianteDashboard;
