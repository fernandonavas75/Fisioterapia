import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const Pacientes = () => {
  const rol = localStorage.getItem('usuario');

  const [pacientes, setPacientes] = useState([
    {
      id: 'PAC001',
      nombres: 'Lucía',
      apellidos: 'Pérez',
      estudiante_id: 'EST001',
      estudiante_nombre: 'Andrea López',
      fecha_actualizacion: '2025-06-06 15:30',
      edad: 10,
      genero: 'Femenino',
      peso: 35,
      estatura: 140,
      fecha_nacimiento: '2014-03-12',
      escuela: 'Unidad Educativa Quito',
      grado: '5to',
      nombre_tutor: 'María Pérez',
      telefono_contacto: '0991234567',
      correo_contacto: 'maria.tutor@gmail.com'
    },
    {
      id: 'PAC002',
      nombres: 'Mateo',
      apellidos: 'Rodríguez',
      estudiante_id: 'EST002',
      estudiante_nombre: 'Carlos García',
      fecha_actualizacion: '2025-06-05 11:10',
      edad: 11,
      genero: 'Masculino',
      peso: 38,
      estatura: 145,
      fecha_nacimiento: '2013-06-22',
      escuela: 'Escuela Los Andes',
      grado: '6to',
      nombre_tutor: 'Luis Rodríguez',
      telefono_contacto: '0987654321',
      correo_contacto: 'luis.padre@gmail.com'
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
