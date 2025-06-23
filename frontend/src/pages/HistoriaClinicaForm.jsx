import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  // Extraer el ID del estudiante desde el JWT
  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const id_estudiante = decoded?.id_usuario;

  useEffect(() => {
    axios.get('http://localhost:3000/api/pacientes')
      .then(res => setPacientes(res.data))
      .catch(err => console.error('Error al cargar pacientes:', err));
  }, []);

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
      await axios.post('http://localhost:3000/api/historias', {
        ...formData,
        id_estudiante,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Historia clínica registrada correctamente');
      setFormData({
        id_paciente: '',
        fecha_evaluacion: '',
        motivo_consulta: '',
        historia_condicion_actual: '',
        diagnostico_preliminar: '',
        plan_intervencion: '',
      });
    } catch (error) {
      console.error('Error al guardar historia clínica:', error);
      alert('Error al guardar la historia clínica');
    }
  };

  return (
    <div className="container bg-white p-4 shadow rounded mt-4">
      <h3 className="mb-4">Historia Clínica Fisioterapéutica Infantil</h3>
      <form onSubmit={handleSubmit}>
        {/* Selección de paciente */}
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

        {/* Campos básicos */}
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
          Guardar Historia Clínica
        </button>
      </form>
    </div>
  );
};

export default HistoriaClinicaForm;
