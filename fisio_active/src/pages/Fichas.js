import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // al inicio del archivo
import '../styles/Fichas.css';


const Fichas = () => {
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([
    {
      id: 'FIC001',
      paciente: 'Lucía Pérez',
      estudiante: 'Andrea López',
      fecha_registro: '2025-06-06',
      numero_atencion: 1,
      tiene_diagnostico: true
    },
    {
      id: 'FIC002',
      paciente: 'Mateo Rodríguez',
      estudiante: 'Carlos García',
      fecha_registro: '2025-06-05',
      numero_atencion: 1,
      tiene_diagnostico: false
    },
    {
      id: 'FIC003',
      paciente: 'Lucía Pérez',
      estudiante: 'Andrea López',
      fecha_registro: '2025-06-07',
      numero_atencion: 2,
      tiene_diagnostico: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({});

  const handleEditar = (index) => {
    setSelectedIndex(index);
    setForm({ ...fichas[index] });
    setShowModal(true);
  };

  const handleGuardar = () => {
    const actualizadas = [...fichas];
    actualizadas[selectedIndex] = form;
    setFichas(actualizadas);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const value = e.target.name === 'tiene_diagnostico'
      ? e.target.value === 'true'
      : e.target.value;

    setForm({
      ...form,
      [e.target.name]: value
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Fichas Registradas</h4>
        <Button variant="success" onClick={() => navigate('/agendar')}>
            + Agregar Ficha
        </Button>
      </div>
      <Table className="table-fichas">
        <thead>
          <tr>
            <th>#</th>
            <th>ID Ficha</th>
            <th>Paciente</th>
            <th>Estudiante</th>
            <th>Fecha de Registro</th>
            <th>N. Atención</th>
            <th>Diagnóstico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fichas.map((ficha, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ficha.id}</td>
              <td>{ficha.paciente}</td>
              <td>{ficha.estudiante}</td>
              <td>{ficha.fecha_registro}</td>
              <td>{ficha.numero_atencion}</td>
              <td>
                <span className={`badge-diagnostico ${ficha.tiene_diagnostico ? 'badge-asociado' : 'badge-sin'}`}>
                  {ficha.tiene_diagnostico ? 'Asociado' : 'Sin diagnóstico'}
                </span>
              </td>
              <td>
                <button className="btn-editar" onClick={() => handleEditar(index)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ficha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID Ficha</Form.Label>
              <Form.Control name="id" value={form.id || ''} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Paciente</Form.Label>
              <Form.Control name="paciente" value={form.paciente || ''} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estudiante</Form.Label>
              <Form.Control name="estudiante" value={form.estudiante || ''} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Registro</Form.Label>
              <Form.Control name="fecha_registro" type="date" value={form.fecha_registro || ''} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de Atención</Form.Label>
              <Form.Control name="numero_atencion" type="number" value={form.numero_atencion || ''} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Diagnóstico</Form.Label>
              <Form.Select name="tiene_diagnostico" value={form.tiene_diagnostico} onChange={handleChange}>
                <option value="true">Tiene diagnóstico</option>
                <option value="false">Sin diagnóstico</option>
              </Form.Select>
            </Form.Group>
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

export default Fichas;
