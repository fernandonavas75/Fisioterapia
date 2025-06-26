import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const ActualizarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    genero: '',
    fecha_nacimiento: '',
    peso: '',
    estatura: '',
    escuela: '',
    grado: '',
    nombre_tutor: '',
    telefono_tutor: '',
    correo_tutor: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos del paciente por ID
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/pacientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const paciente = res.data;
        setFormData({
          ...paciente,
          fecha_nacimiento: paciente.fecha_nacimiento?.split("T")[0] || ''
        });
      } catch (err) {
        console.error("Error al cargar paciente:", err);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/pacientes/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/lista-pacientes');
    } catch (err) {
      console.error('Error al actualizar paciente:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-10">
          <h3 className="mt-4">Editar Paciente</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {[
                { name: "nombres", label: "Nombres", type: "text" },
                { name: "apellidos", label: "Apellidos", type: "text" },
                { name: "edad", label: "Edad", type: "number", min: "0" },
                { name: "genero", label: "Género", type: "select" },
                { name: "fecha_nacimiento", label: "Fecha de Nacimiento", type: "date" },
                { name: "peso", label: "Peso (kg)", type: "number", step: "0.01" },
                { name: "estatura", label: "Estatura (m)", type: "number", step: "0.01" },
                { name: "escuela", label: "Escuela", type: "text" },
                { name: "grado", label: "Grado", type: "text" },
                { name: "nombre_tutor", label: "Nombre del Tutor", type: "text" },
                { name: "telefono_tutor", label: "Teléfono del Tutor", type: "text" },
                { name: "correo_tutor", label: "Correo del Tutor", type: "email" }
              ].map((field, idx) => (
                <div className="col-md-6 mb-3" key={idx}>
                  <label className="form-label">{field.label}</label>
                  {field.type === "select" ? (
                    <select className="form-select" name={field.name} value={formData.genero} onChange={handleChange} required>
                      <option value="">Seleccione</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      {...(field.min && { min: field.min })}
                      {...(field.step && { step: field.step })}
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPaciente;
