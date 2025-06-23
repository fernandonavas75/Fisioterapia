import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const HistoriaClinicaForm = () => {
  const [pacientes, setPacientes] = useState([]);
  const [formData, setFormData] = useState({
    id_paciente: '',
    fecha_evaluacion: '',
    motivo_consulta: '',
    historia_condicion_actual: '',
    diagnostico_preliminar: '',
    plan_intervencion: '',
  });

  const { id } = useParams(); // Detectar si viene un ID por URL
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const id_estudiante = decoded?.id_usuario;

  // Cargar pacientes
  useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get('http://localhost:3000/api/pacientes', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => setPacientes(res.data))
    .catch(err => console.error('Error al cargar pacientes:', err));
}, []);

  // Si existe ID (modo edición), cargar datos existentes
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/historias/${id}`)
        .then(res => {
          const historia = res.data;
          setFormData({
            id_paciente: historia.id_paciente,
            fecha_evaluacion: historia.fecha_evaluacion.split("T")[0],
            motivo_consulta: historia.motivo_consulta || '',
            historia_condicion_actual: historia.historia_condicion_actual || '',
            diagnostico_preliminar: historia.diagnostico_preliminar || '',
            plan_intervencion: historia.plan_intervencion || '',
          });
        })
        .catch(err => console.error("Error al cargar historia:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Modo edición (PUT)
        await axios.put(`http://localhost:3000/api/historias/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Historia actualizada correctamente");
      } else {
        // Modo creación (POST)
        await axios.post('http://localhost:3000/api/historias', {
          ...formData,
          id_estudiante,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Historia registrada correctamente");
      }
      navigate('/estudiante');
    } catch (error) {
      console.error('Error al guardar historia clínica:', error);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  return (
    <div className="container bg-white p-4 shadow rounded mt-4">
      <h3 className="mb-4">{id ? "Editar Historia Clínica" : "Nueva Historia Clínica"}</h3>
      <form onSubmit={handleSubmit}>
        {/* Select paciente */}
        <div className="mb-3">
          <label>Paciente</label>
          <select
            className="form-select"
            name="id_paciente"
            value={formData.id_paciente}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un paciente</option>
            {pacientes.map(p => (
              <option key={p.id_paciente} value={p.id_paciente}>
                {p.nombres} {p.apellidos}
              </option>
            ))}
          </select>
        </div>

        {/* Resto de campos */}
        <div className="mb-3">
          <label>Fecha de evaluación</label>
          <input
            type="date"
            className="form-control"
            name="fecha_evaluacion"
            value={formData.fecha_evaluacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Motivo de consulta</label>
          <textarea
            className="form-control"
            name="motivo_consulta"
            value={formData.motivo_consulta}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Historia de la condición actual</label>
          <textarea
            className="form-control"
            name="historia_condicion_actual"
            value={formData.historia_condicion_actual}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Diagnóstico preliminar</label>
          <textarea
            className="form-control"
            name="diagnostico_preliminar"
            value={formData.diagnostico_preliminar}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Plan de intervención</label>
          <textarea
            className="form-control"
            name="plan_intervencion"
            value={formData.plan_intervencion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          {id ? "Actualizar Historia" : "Guardar Historia"}
        </button>
        <button type="button"className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/estudiante')}>Cancelar</button>
      </form>
    </div>
  );
};

export default HistoriaClinicaForm;
