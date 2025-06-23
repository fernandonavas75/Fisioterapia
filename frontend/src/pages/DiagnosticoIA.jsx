import React, { useState } from 'react';
import axios from 'axios';

const DiagnosticoIA = () => {
  const [sintomas, setSintomas] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setRespuesta('');

    try {
      const res = await axios.post('http://localhost:3000/api/ia/diagnostico', { sintomas });
      setRespuesta(res.data.respuesta);
    } catch (error) {
      console.error(error);
      setRespuesta('Hubo un error al obtener el diagnóstico.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Diagnóstico Inteligente con IA</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="sintomas" className="form-label">Describe los síntomas del paciente:</label>
          <textarea
            className="form-control"
            id="sintomas"
            rows="4"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={cargando}>
          {cargando ? 'Analizando...' : 'Obtener Diagnóstico'}
        </button>
      </form>

      {respuesta && (
        <div className="alert alert-info mt-4">
          <strong>Diagnóstico IA:</strong>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosticoIA;
