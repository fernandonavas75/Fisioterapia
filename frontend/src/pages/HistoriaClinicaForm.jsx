
// HistoriaClinicaForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";

const HistoriaClinicaForm = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const [formData, setFormData] = useState({
    id_paciente: "",
    fecha_evaluacion: "",
    motivo_consulta: "",
    historia_condicion_actual: "",
    diagnostico_preliminar: "",
    plan_intervencion: ""
  });

  const [antecedentes, setAntecedentes] = useState({
    enfermedades_importantes: "",
    cirugias_previas: "",
    hospitalizaciones: "",
    alergias: "",
    medicamentos_actuales: "",
    vacunacion_completa: false,
    enf_musculoesqueleticas_familia: "",
    condiciones_hereditarias: ""
  });

  const [evaluacionPostural, setEvaluacionPostural] = useState({
    cabeza_cuello: "",
    hombros: "",
    columna: "",
    pelvis: "",
    extremidades: "",
    arco_plantar: ""
  });

  const [fuerzaMuscular, setFuerzaMuscular] = useState([
    { zona_anatomica: "", musculo: "", grado: 0 }
  ]);

  const [informeFinal, setInformeFinal] = useState({
    lugar_atencion: "",
    resumen_clinico: "",
    recomendaciones: "",
    evaluador_nombre: "",
    fecha_informe: ""
  });

  const [seguimientos, setSeguimientos] = useState([
    { fecha: "", intervenciones: "", observaciones: "" }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAntecedentesChange = (e) => {
    const { name, value } = e.target;
    setAntecedentes(prev => ({ ...prev, [name]: value }));
  };

  const handleEvaluacionChange = (e) => {
    const { name, value } = e.target;
    setEvaluacionPostural(prev => ({ ...prev, [name]: value }));
  };

  const handleFuerzaChange = (index, e) => {
    const nuevos = [...fuerzaMuscular];
    nuevos[index][e.target.name] = e.target.value;
    setFuerzaMuscular(nuevos);
  };

  const agregarFuerza = () => {
    setFuerzaMuscular([...fuerzaMuscular, { zona_anatomica: "", musculo: "", grado: 0 }]);
  };

  const eliminarFuerza = (index) => {
    const nuevos = [...fuerzaMuscular];
    nuevos.splice(index, 1);
    setFuerzaMuscular(nuevos);
  };

  const handleSeguimientoChange = (index, e) => {
    const nuevos = [...seguimientos];
    nuevos[index][e.target.name] = e.target.value;
    setSeguimientos(nuevos);
  };

  const agregarSeguimiento = () => {
    setSeguimientos([...seguimientos, { fecha: "", intervenciones: "", observaciones: "" }]);
  };

  const eliminarSeguimiento = (index) => {
    const nuevos = [...seguimientos];
    nuevos.splice(index, 1);
    setSeguimientos(nuevos);
  };

  const handleInformeChange = (e) => {
    const { name, value } = e.target;
    setInformeFinal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setExito(false);

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const id_estudiante = decoded.id_usuario;

      const payload = {
        historia: { ...formData, id_estudiante },
        antecedentes,
        evaluacionPostural,
        fuerzaMuscular,
        informeFinal,
        seguimientos
      };

      await axios.post("http://localhost:3000/api/historia-completa", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setExito(true);
      setTimeout(() => navigate("/estudiante/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setError("Error al crear la historia clínica.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPacientes = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/api/pacientes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPacientes(res.data);
      } catch (err) {
        console.error("Error al cargar pacientes");
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Registrar Nueva Historia Clínica</h3>
      <form onSubmit={handleSubmit}>
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
        {/* Aquí se deben agregar todos los inputs como ya se ha mostrado en pasos anteriores */}
        <div className="mb-3">
  <label>Fecha de Evaluación</label>
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
  <label>Motivo de Consulta</label>
  <textarea
    className="form-control"
    name="motivo_consulta"
    value={formData.motivo_consulta}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label>Historia de la Condición Actual</label>
  <textarea
    className="form-control"
    name="historia_condicion_actual"
    value={formData.historia_condicion_actual}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label>Diagnóstico Preliminar</label>
  <input
    type="text"
    className="form-control"
    name="diagnostico_preliminar"
    value={formData.diagnostico_preliminar}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label>Plan de Intervención</label>
  <textarea
    className="form-control"
    name="plan_intervencion"
    value={formData.plan_intervencion}
    onChange={handleChange}
  />
</div>
<hr />
<h5 className="mt-4">Antecedentes</h5>

<div className="mb-3">
  <label>Enfermedades Importantes</label>
  <textarea
    className="form-control"
    name="enfermedades_importantes"
    value={antecedentes.enfermedades_importantes}
    onChange={handleAntecedentesChange}
  />
</div>

<div className="mb-3">
  <label>Cirugías Previas</label>
  <textarea
    className="form-control"
    name="cirugias_previas"
    value={antecedentes.cirugias_previas}
    onChange={handleAntecedentesChange}
  />
</div>

<div className="mb-3">
  <label>Hospitalizaciones</label>
  <textarea
    className="form-control"
    name="hospitalizaciones"
    value={antecedentes.hospitalizaciones}
    onChange={handleAntecedentesChange}
  />
</div>

<div className="mb-3">
  <label>Alergias</label>
  <input
    type="text"
    className="form-control"
    name="alergias"
    value={antecedentes.alergias}
    onChange={handleAntecedentesChange}
  />
</div>

<div className="mb-3">
  <label>Medicamentos Actuales</label>
  <textarea
    className="form-control"
    name="medicamentos_actuales"
    value={antecedentes.medicamentos_actuales}
    onChange={handleAntecedentesChange}
  />
</div>

<div className="form-check mb-3">
  <input
    className="form-check-input"
    type="checkbox"
    name="vacunacion_completa"
    checked={antecedentes.vacunacion_completa}
    onChange={(e) =>
      setAntecedentes((prev) => ({
        ...prev,
        vacunacion_completa: e.target.checked,
      }))
    }
  />
  <label className="form-check-label">Vacunación Completa</label>
</div>

<div className="mb-3">
  <label>Enfermedades Musculoesqueléticas Familiares</label>
  <textarea
    className="form-control"
    name="enf_musculoesqueleticas_familia"
    value={antecedentes.enf_musculoesqueleticas_familia}
    onChange={handleAntecedentesChange}
  />
</div>

<div className="mb-3">
  <label>Condiciones Hereditarias</label>
  <textarea
    className="form-control"
    name="condiciones_hereditarias"
    value={antecedentes.condiciones_hereditarias}
    onChange={handleAntecedentesChange}
  />
</div>
<hr />
<h5 className="mt-4">Evaluación Postural</h5>

<div className="mb-3">
  <label>Cabeza y Cuello</label>
  <textarea
    className="form-control"
    name="cabeza_cuello"
    value={evaluacionPostural.cabeza_cuello}
    onChange={handleEvaluacionChange}
  />
</div>

<div className="mb-3">
  <label>Hombros</label>
  <textarea
    className="form-control"
    name="hombros"
    value={evaluacionPostural.hombros}
    onChange={handleEvaluacionChange}
  />
</div>

<div className="mb-3">
  <label>Columna</label>
  <textarea
    className="form-control"
    name="columna"
    value={evaluacionPostural.columna}
    onChange={handleEvaluacionChange}
  />
</div>

<div className="mb-3">
  <label>Pelvis</label>
  <textarea
    className="form-control"
    name="pelvis"
    value={evaluacionPostural.pelvis}
    onChange={handleEvaluacionChange}
  />
</div>

<div className="mb-3">
  <label>Extremidades</label>
  <textarea
    className="form-control"
    name="extremidades"
    value={evaluacionPostural.extremidades}
    onChange={handleEvaluacionChange}
  />
</div>

<div className="mb-3">
  <label>Arco Plantar</label>
  <textarea
    className="form-control"
    name="arco_plantar"
    value={evaluacionPostural.arco_plantar}
    onChange={handleEvaluacionChange}
  />
</div>

<hr />
<h5 className="mt-4">Fuerza Muscular</h5>

{fuerzaMuscular.map((item, index) => (
  <div key={index} className="border rounded p-3 mb-3">
    <div className="mb-2">
      <label>Zona Anatómica</label>
      <input
        type="text"
        className="form-control"
        name="zona_anatomica"
        value={item.zona_anatomica}
        onChange={(e) => handleFuerzaChange(index, e)}
      />
    </div>
    <div className="mb-2">
      <label>Músculo</label>
      <input
        type="text"
        className="form-control"
        name="musculo"
        value={item.musculo}
        onChange={(e) => handleFuerzaChange(index, e)}
      />
    </div>
    <div className="mb-2">
      <label>Grado</label>
      <input
        type="number"
        min="0"
        max="5"
        className="form-control"
        name="grado"
        value={item.grado}
        onChange={(e) => handleFuerzaChange(index, e)}
      />
    </div>
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={() => eliminarFuerza(index)}
    >
      Eliminar
    </button>
  </div>
))}

<button
  type="button"
  className="btn btn-outline-primary"
  onClick={agregarFuerza}
>
  + Añadir Músculo
</button>


<hr />
<h5 className="mt-4">Informe Final</h5>

<div className="mb-3">
  <label>Lugar de Atención</label>
  <input
    type="text"
    className="form-control"
    name="lugar_atencion"
    value={informeFinal.lugar_atencion}
    onChange={handleInformeChange}
  />
</div>

<div className="mb-3">
  <label>Resumen Clínico</label>
  <textarea
    className="form-control"
    name="resumen_clinico"
    rows="3"
    value={informeFinal.resumen_clinico}
    onChange={handleInformeChange}
  ></textarea>
</div>

<div className="mb-3">
  <label>Recomendaciones</label>
  <textarea
    className="form-control"
    name="recomendaciones"
    rows="3"
    value={informeFinal.recomendaciones}
    onChange={handleInformeChange}
  ></textarea>
</div>

<div className="mb-3">
  <label>Nombre del Evaluador</label>
  <input
    type="text"
    className="form-control"
    name="evaluador_nombre"
    value={informeFinal.evaluador_nombre}
    onChange={handleInformeChange}
  />
</div>

<div className="mb-3">
  <label>Fecha del Informe</label>
  <input
    type="date"
    className="form-control"
    name="fecha_informe"
    value={informeFinal.fecha_informe}
    onChange={handleInformeChange}
  />
</div>


<hr />
<h5 className="mt-4">Seguimientos</h5>
{seguimientos.map((s, index) => (
  <div key={index} className="border p-3 mb-3 rounded">
    <div className="mb-3">
      <label>Fecha</label>
      <input
        type="date"
        className="form-control"
        name="fecha"
        value={s.fecha}
        onChange={(e) => handleSeguimientoChange(index, e)}
      />
    </div>

    <div className="mb-3">
      <label>Intervenciones</label>
      <textarea
        className="form-control"
        name="intervenciones"
        rows="2"
        value={s.intervenciones}
        onChange={(e) => handleSeguimientoChange(index, e)}
      ></textarea>
    </div>

    <div className="mb-3">
      <label>Observaciones</label>
      <textarea
        className="form-control"
        name="observaciones"
        rows="2"
        value={s.observaciones}
        onChange={(e) => handleSeguimientoChange(index, e)}
      ></textarea>
    </div>

    <button type="button" className="btn btn-danger" onClick={() => eliminarSeguimiento(index)}>
      Eliminar seguimiento
    </button>
  </div>
))}

<div className="mb-3">
  <button type="button" className="btn btn-secondary" onClick={agregarSeguimiento}>
    Agregar seguimiento
  </button>
</div>


<div className="d-flex justify-content-between mt-4">
  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/estudiante")}>
    Volver al Dashboard
  </button>

  <button type="submit" className="btn btn-primary" disabled={loading}>
    {loading ? (
      <>
        <Spinner animation="border" size="sm" className="me-2" />
        Guardando...
      </>
    ) : (
      "Guardar Cambios"
    )}
  </button>
</div>

      </form>
    </div>
  );
};

export default HistoriaClinicaForm;
