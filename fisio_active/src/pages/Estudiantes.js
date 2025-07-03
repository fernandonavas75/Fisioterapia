import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Estudiantes.css';

const Estudiantes = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({});
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const base = [
      {
        id_usuario: 1,
        cedula: '1723456789',
        nombres: 'Andrea',
        apellidos: 'López',
        correo: 'andrea.lopez@puce.edu.ec',
        rol: 'estudiante',
        conexion: '2025-06-04',
        contrasena: 'andrea123'
      },
      {
        id_usuario: 2,
        cedula: '1711122233',
        nombres: 'Carlos',
        apellidos: 'García',
        correo: 'carlos.garcia@puce.edu.ec',
        rol: 'estudiante',
        conexion: '2025-06-05',
        contrasena: 'andrea123'
      },
      {
        id_usuario: 3,
        cedula: '1719988776',
        nombres: 'Valeria',
        apellidos: 'Mendoza',
        correo: 'valeria.mendoza@puce.edu.ec',
        rol: 'estudiante',
        conexion: '2025-06-06',
        contrasena: 'andrea123'
      }
    ];
    const guardados = JSON.parse(localStorage.getItem('estudiantes')) || [];
    setEstudiantes([...base, ...guardados]);
  }, []);

  const actualizarLocalStorage = (nuevos) => {
    const baseLength = 3;
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="success" onClick={() => navigate('/agregar-estudiantes')}>
          Agregar Estudiantes
        </Button>
        {/* Puedes agregar otros botones a la derecha si necesitas */}
      </div>


      <Table className="table-estudiantes">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cédula</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Última Conexión (fecha)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes
            .filter(est => est.rol === 'estudiante')
            .map((est, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{est.nombres}</td>
                <td>{est.apellidos}</td>
                <td>{est.cedula}</td>
                <td>{est.correo}</td>
                <td>{est.rol}</td>
                <td>{est.conexion}</td>
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
      <Modal show={showModal} onHide={() => { setShowModal(false); setConfirmDeleteIndex(null); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Cédula</Form.Label>
              <Form.Control name="cedula" value={form.cedula || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Nombres</Form.Label>
              <Form.Control name="nombres" value={form.nombres || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Apellidos</Form.Label>
              <Form.Control name="apellidos" value={form.apellidos || ''} onChange={handleChange} />

              <Form.Label className="mt-3">Correo</Form.Label>
              <Form.Control name="correo" value={form.correo || ''} onChange={handleChange} />
              
              <Form.Label className="mt-3">Contraseña</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={form.contrasena || ''}
                  disabled
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </Button>
                <Button variant="outline-primary" onClick={() => setShowChangePassModal(true)}>
                  Cambiar
                </Button>
              </div>


              <Form.Label className="mt-3">Rol</Form.Label>
              <Form.Control name="rol" value={form.rol || ''} onChange={handleChange} disabled />

              <Form.Label className="mt-3">Última Conexión</Form.Label>
              <Form.Control name="conexion" value={form.conexion || ''} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {confirmDeleteIndex === selectedIndex ? (
            <>
              <Button variant="danger" onClick={() => confirmarEliminar(selectedIndex)}>Confirmar</Button>
              <Button variant="secondary" onClick={cancelarEliminar}>Cancelar</Button>
            </>
          ) : (
            <Button variant="outline-danger" onClick={() => setConfirmDeleteIndex(selectedIndex)}>
              Eliminar estudiante
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleGuardar}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showChangePassModal}
        onHide={() => setShowChangePassModal(false)}
        centered
        dialogClassName="slide-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nueva contraseña</Form.Label>
            <div className="input-group mb-3">
              <Form.Control
                type={showNewPass ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setShowNewPass(!showNewPass)}>
                <i className={`bi ${showNewPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </div>

            <Form.Label>Confirmar contraseña</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showConfirmPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                <i className={`bi ${showConfirmPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChangePassModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={() => {
              if (newPassword === confirmPassword && newPassword !== '') {
                setForm({ ...form, contrasena: newPassword });
                setShowChangePassModal(false);
                setNewPassword('');
                setConfirmPassword('');
              } else {
                alert('Las contraseñas no coinciden o están vacías');
              }
            }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};


export default Estudiantes;

