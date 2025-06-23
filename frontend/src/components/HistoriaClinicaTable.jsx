import React, { useEffect, useState } from "react";

const HistoriaClinicaTable = () => {
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historiasClinicas")) || [];
    setHistorias(data);
  }, []);

  const eliminarFicha = (index) => {
    if (window.confirm("¿Estás seguro de eliminar esta ficha?")) {
      const nuevasHistorias = [...historias];
      nuevasHistorias.splice(index, 1);
      localStorage.setItem("historiasClinicas", JSON.stringify(nuevasHistorias));
      setHistorias(nuevasHistorias);
    }
  };

  return historias.length === 0 ? (
    <p className="text-muted">No se encontraron pacientes.</p>
  ) : (
    <table className="table table-bordered mt-3">
      <thead>
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
        {historias.map((historia, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{historia.nombre || "-"}</td>
            <td>{historia.evaluador || "-"}</td>
            <td>{historia.fecha_evaluacion || "-"}</td>
            <td>{historia.escuela || "-"}</td>
            <td>{historia.diagnostico || "-"}</td>
            <td>{historia.grado || "-"}</td>
            <td>Registrada</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-1"
                onClick={() => {
                  localStorage.setItem("fichaAEditar", i);
                  window.location.href = "/historia_clinica";
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => eliminarFicha(i)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoriaClinicaTable;
