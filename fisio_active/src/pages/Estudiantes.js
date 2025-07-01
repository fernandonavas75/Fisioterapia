import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Estudiantes = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({});
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  // Cargar estudiantes base + guardados
  useEffect(() => {
    const base = [
      {
        estuid: 'EST001',
        cedula: '1723456789',
        nombre: 'Andrea',
        apellido: 'López',
        correo: 'andrea.lopez@puce.edu.ec',
        sector: 'Centro Norte',
        semestre: 7,
        ultimaConexion: '2025-06-04 18:23',
        fichas: 5
      },
      {
        estuid: 'EST002',
        cedula: '1711122233',
        nombre: 'Carlos',
        apellido: 'García',
        correo: 'carlos.garcia@puce.edu.ec',
        sector: 'Sur',
        semestre: 6,
        ultimaConexion: '2025-06-05 12:45',
        fichas: 3
      },
      {
        estuid: 'EST003',
        cedula: '1719988776',
        nombre: 'Valeria',
        apellido: 'Mendoza',
        correo: 'valeria.mendoza@puce.edu.ec',
        sector: 'Norte',
        semestre: 8,
        ultimaConexion: '2025-06-06 08:10',
        fichas: 8
      }
    ];
    const guardados = JSON.parse(localStorage.getItem('estudiantes')) || [];
    setEstudiantes([...base, ...guardados]);
  }, []);

  const actualizarLocalStorage = (nuevos) => {
    const baseLength = 3; // Los 3 registros iniciales
    const soloNuevos = nuevos.slice(baseLength);
    localStorage.setItem('estudiantes', JSON.stringify(soloNuevos));
  };

  const handleEditar = (index) => {
    setSelectedIndex(index);
    setForm({ ...estudiantes[index] });
    setConfirmDeleteIndex(null);
    setShowModal(true);
  };

  const handleGuardar = () => {
    const nuevos = [...estudiantes];
    nuevos[selectedIndex] = form;
    setEstudiantes(nuevos);
    actualizarLocalStorage(nuevos);
    setShowModal(false);
    setConfirmDeleteIndex(null);
  };

  const confirmarEliminar = (index) => {
    const nuevos = [...estudiantes];
    nuevos.splice(index, 1);
    setEstudiantes(nuevos);
    actualizarLocalStorage(nuevos);
    setShowModal(false);
    setConfirmDeleteIndex(null);
  };

  const cancelarEliminar = () => {
    setConfirmDeleteIndex(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h4>Estudiantes Registrados</h4>

      <Button className="mb-3" variant="success" onClick={() => navigate('/agregar-estudiantes')}>
        Agregar Estudiantes
      </Button>

      <Table striped bordered hover>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Sector</th>
            <th>Semestre</th>
            <th>Última conexión</th>
            <th>Fichas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{est.estuid}</td>
              <td>{est.cedula}</td>
              <td>{est.nombre}</td>
              <td>{est.apellido}</td>
              <td>{est.correo}</td>
              <td>{est.sector}</td>
              <td>{est.semestre}</td>
              <td>{est.ultimaConexion}</td>
              <td>{est.fichas}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditar(index)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal edición */}
      <Modal show={showModal} onHide={() => { setShowModal(false); setConfirmDeleteIndex(null); }} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <div className="row">
                <div className="col-md-6">
                  <Form.Label>ID</Form.Label>
                  <Form.Control name="estuid" value={form.estuid || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <Form.Label>Cédula</Form.Label>
                  <Form.Control name="cedula" value={form.cedula || ''} onChange={handleChange} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control name="nombre" value={form.nombre || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control name="apellido" value={form.apellido || ''} onChange={handleChange} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control name="correo" value={form.correo || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <Form.Label>Sector</Form.Label>
                  <Form.Control name="sector" value={form.sector || ''} onChange={handleChange} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <Form.Label>Semestre</Form.Label>
                  <Form.Control name="semestre" value={form.semestre || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6 d-flex align-items-end justify-content-end">
                  {confirmDeleteIndex === selectedIndex ? (
                    <>
                      <Button variant="danger" onClick={() => confirmarEliminar(selectedIndex)} className="me-2">
                        Confirmar
                      </Button>
                      <Button variant="secondary" onClick={cancelarEliminar}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline-danger" onClick={() => setConfirmDeleteIndex(selectedIndex)}>
                      Eliminar estudiante
                    </Button>
                  )}
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); setConfirmDeleteIndex(null); }}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleGuardar}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Estudiantes;
