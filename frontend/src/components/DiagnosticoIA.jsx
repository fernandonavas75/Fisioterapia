import React, { useState } from 'react';
import axios from 'axios';

const DiagnosticoIA = () => {
  const [sintomas, setSintomas] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviarSintomas = async () => {
    if (!sintomas.trim()) return alert("Ingresa una descripción de síntomas.");

    setCargando(true);
    try {
      const res = await axios.post('http://localhost:3000/api/ia/diagnostico', { sintomas });
      setRespuesta(res.data.respuesta);
    } catch (err) {
      console.error(err);
      alert("Error al obtener diagnóstico.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Diagnóstico Asistido por IA</h2>

      <div className="mb-3">
        <label className="form-label">Síntomas del paciente:</label>
        <textarea
          className="form-control"
          rows="4"
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          placeholder="Ej. Dolor lumbar, rigidez al caminar, debilidad en pierna izquierda..."
        />
      </div>

      <button className="btn btn-primary" onClick={enviarSintomas} disabled={cargando}>
        {cargando ? 'Analizando...' : 'Obtener Diagnóstico'}
      </button>

      {respuesta && (
        <div className="alert alert-info mt-4">
          <h5>Respuesta IA:</h5>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosticoIA;
