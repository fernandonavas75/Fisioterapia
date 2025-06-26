import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/pacientes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPacientes(res.data);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleEditar = (id) => {
    navigate(`/editar-paciente/${id}`);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h3 className="mb-4">Lista de Pacientes</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Escuela</th>
                <th>Grado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id_paciente}>
                  <td>{p.nombres}</td>
                  <td>{p.apellidos}</td>
                  <td>{p.escuela}</td>
                  <td>{p.grado}</td>
                  <td>
                    <Link to={`/editar-paciente/${p.id_paciente}`} className="btn btn-warning btn-sm">Editar</Link>
                  </td>
                </tr>
              ))}
              {pacientes.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No hay pacientes registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaPacientes;
