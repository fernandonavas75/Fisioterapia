import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoriaClinicaTable = () => {
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/historias")
      .then(response => {
        console.log("Historias obtenidas:", response.data);  // Confirmar datos
        setHistorias(response.data);
      })
      .catch(error => console.error("Error al obtener historias:", error));
  }, []);

  return historias.length === 0 ? (
    <p className="text-muted">No se encontraron historias clínicas.</p>
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
          <tr key={historia.id_historia}>
            <td>{i + 1}</td>
            <td>{historia.paciente?.nombres} {historia.paciente?.apellidos}</td>
            <td>{historia.estudiante?.nombre_completo}</td>
            <td>{historia.fecha_evaluacion?.split("T")[0]}</td>
            <td>{historia.paciente?.escuela || "-"}</td>
            <td>{historia.diagnostico_preliminar || "-"}</td>
            <td>{historia.paciente?.grado || "-"}</td>
            <td>Registrada</td>
            <td>
              <button className="btn btn-sm btn-primary me-1">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoriaClinicaTable;
