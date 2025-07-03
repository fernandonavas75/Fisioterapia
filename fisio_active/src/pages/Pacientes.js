import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // 🔹 Añadido para navegación
import './Pacientes.css';

const Pacientes = () => {
  const rol = localStorage.getItem('usuario');
  const navigate = useNavigate(); // 🔹 Hook de navegación

  const [pacientes, setPacientes] = useState([
    {
      id_paciente: 1,
      nombres: 'Lucía',
      apellidos: 'Pérez',
      genero: 'Femenino',
      fecha_nacimiento: '2014-03-12',
    },
    {
      id_paciente: 2,
      nombres: 'Mateo',
      apellidos: 'Rodríguez',
      genero: 'Masculino',
      fecha_nacimiento: '2013-06-22',
    }
  ]);

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verDetalle = (paciente) => {
    navigate(`/pacientes/${paciente.id_paciente}`, { state: paciente }); // 🔹 Redirección con datos
  };

  return (
    <div className="container py-4">
      {/* Botón: Nuevo Paciente */}
      <div className="mb-3 d-flex justify-content-end">
        <Button className="btn-success">
          <i className="bi bi-person-plus"></i> Nuevo paciente
        </Button>
      </div>

      {/* Tabla de pacientes */}
      <div className="table-responsive">
        <Table className="table align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Género</th>
              <th>Fecha de nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>PAC{String(p.id_paciente).padStart(3, '0')}</td>
                <td>{p.nombres}</td>
                <td>{p.apellidos}</td>
                <td>{p.genero}</td>
                <td>{p.fecha_nacimiento}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-1"
                    title="Ver"
                    onClick={() => verDetalle(p)} // 🔹 Acción agregada
                  >
                    <i className="bi bi-eye"></i>
                  </Button>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleEditar(index)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              {[
                { name: 'nombres', label: 'Nombres' },
                { name: 'apellidos', label: 'Apellidos' },
                {
                  name: 'genero',
                  label: 'Género',
                  type: 'select',
                  options: ['Femenino', 'Masculino', 'Otro']
                },
                {
                  name: 'fecha_nacimiento',
                  label: 'Fecha de nacimiento',
                  type: 'date'
                }
              ].map(({ name, label, type = 'text', options }) => (
                <div className="col-md-6 mb-3" key={name}>
                  <Form.Label>{label}</Form.Label>
                  {type === 'select' ? (
                    <Form.Select name={name} value={form[name] || ''} onChange={handleChange}>
                      <option value="">Seleccionar</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </Form.Select>
                  ) : (
                    <Form.Control name={name} type={type} value={form[name] || ''} onChange={handleChange} />
                  )}
                </div>
              ))}
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
