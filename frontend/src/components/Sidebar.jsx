import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar col-md-2">
  <h5 className="text-center mb-4">Menú</h5>
  <Link to="/historia-clinica">Historia Clínica</Link>
  <Link to="/diagnostico-ia">Diagnóstico IA</Link>
  <Link to="/reportes">Reportes</Link>
  <Link to="/registrar-paciente">Registrar Paciente</Link>
  <button onClick={handleLogout} className="btn btn-danger mt-4 w-100">Cerrar sesión</button>
</div>
);

export default Sidebar;
