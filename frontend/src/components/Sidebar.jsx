// src/components/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();



  return (
    <div className="sidebar col-md-2 bg-white border-end vh-100 p-3">
      <h5 className="text-center mb-4">Menú</h5>
      <Link to="/HistoriaClinicaForm" className="d-block py-2 text-primary">Historia Clínica</Link>
     <Link to="/diagnostico-ia" className="d-block py-2 text-primary">Diagnóstico IA</Link>
      <Link to="/reportes" className="d-block py-2 text-primary">Reportes</Link>
      <Link to="/registrar-paciente" className="d-block py-2 text-primary">Registrar Paciente</Link>
      <button onClick={handleLogout} className="btn btn-outline-danger mt-3 w-100">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Sidebar;
