import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
//import {React}, { useEffect } from 'react';
import axios from 'axios';


const Pacientes = () => {
  const rol = localStorage.getItem('usuario');

  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
  const fetchPacientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/pacientes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pacientesTransformados = response.data.map((p) => ({
        id: `PAC${String(p.id_paciente).padStart(3, '0')}`,
        nombres: p.nombres,
        apellidos: p.apellidos,
        edad: p.edad,
        genero: p.genero,
        peso: p.peso,
        estatura: p.estatura,
        fecha_nacimiento: p.fecha_nacimiento?.split('T')[0],
        escuela: p.escuela,
        grado: p.grado,
        nombre_tutor: p.nombre_tutor,
        telefono_contacto: p.telefono_tutor,
        correo_contacto: p.correo_tutor,
      }));

      setPacientes(pacientesTransformados);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  fetchPacientes();
}, []);


  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({});

  const handleEditar = (index) => {
    setSelectedIndex(index);
    setForm({ ...pacientes[index] });
    setShowModal(true);
  };

  const handleGuardar = () => {
    const actualizados = [...pacientes];
    actualizados[selectedIndex] = form;
    setPacientes(actualizados);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h4>{rol === 'admin' ? 'Todos los Pacientes' : 'Mis Pacientes'}</h4>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Estudiante asignado</th>
            <th>Fecha actualización</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Peso</th>
            <th>Estatura</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.id}</td>
              <td>{p.nombres}</td>
              <td>{p.apellidos}</td>
              <td>{`${p.estudiante_id} - ${p.estudiante_nombre}`}</td>
              <td>{p.fecha_actualizacion}</td>
              <td>{p.edad}</td>
              <td>{p.genero}</td>
              <td>{p.peso} kg</td>
              <td>{p.estatura} cm</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditar(index)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control name="nombres" value={form.nombres || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control name="apellidos" value={form.apellidos || ''} onChange={handleChange} />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control name="edad" type="number" value={form.edad || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Género</Form.Label>
                <Form.Select name="genero" value={form.genero || ''} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Peso (kg)</Form.Label>
                <Form.Control name="peso" type="number" value={form.peso || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Estatura (cm)</Form.Label>
                <Form.Control name="estatura" type="number" value={form.estatura || ''} onChange={handleChange} />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control name="fecha_nacimiento" type="date" value={form.fecha_nacimiento || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Escuela</Form.Label>
                <Form.Control name="escuela" value={form.escuela || ''} onChange={handleChange} />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Grado</Form.Label>
                <Form.Control name="grado" value={form.grado || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Nombre del tutor</Form.Label>
                <Form.Control name="nombre_tutor" value={form.nombre_tutor || ''} onChange={handleChange} />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control name="telefono_contacto" value={form.telefono_contacto || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control name="correo_contacto" value={form.correo_contacto || ''} onChange={handleChange} />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleGuardar}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pacientes;
