import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SECTORES = ['Centro Norte', 'Sur', 'Norte', 'Valles', 'Occidental'];
const PACIENTES_SIMULADOS = [
  'Paciente 001', 'Paciente 002', 'Paciente 003', 'Paciente 004', 'Paciente 005',
  'Paciente 006', 'Paciente 007', 'Paciente 008', 'Paciente 009', 'Paciente 010',
  'Paciente 011', 'Paciente 012', 'Paciente 013', 'Paciente 014', 'Paciente 015',
  'Paciente 016', 'Paciente 017', 'Paciente 018', 'Paciente 019', 'Paciente 020'
];

const AgregarEstudiantes = () => {
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [ultimoID, setUltimoID] = useState(1000);
  const [errorCantidad, setErrorCantidad] = useState('');
  const [sectorGlobal, setSectorGlobal] = useState('');
  const [mostrarContrasenas, setMostrarContrasenas] = useState(true);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('estudiantes')) || [];
    setUltimoID(1000 + guardados.length);
  }, []);

  const generarContrasena = () => {
    return Math.random().toString(36).slice(-8);
  };

  const validarCantidad = (valor) => {
    if (!/^\d+$/.test(valor)) return 'Solo se permiten números enteros.';
    const num = parseInt(valor, 10);
    if (num < 1 || num > 20) return 'Debe ingresar entre 1 y 20 estudiantes.';
    return '';
  };

  const handleCantidadChange = (e) => {
    const val = e.target.value;
    setCantidad(val);
    setErrorCantidad(validarCantidad(val));
  };

  const generarListaEstudiantes = () => {
    const error = validarCantidad(cantidad);
    setErrorCantidad(error);
    if (error) return;
    const hoy = new Date().toISOString().split('T')[0];
    const n = parseInt(cantidad);

    const lista = Array.from({ length: n }, (_, i) => ({
      estuid: `EST${ultimoID + i}`,
      nombres: '',
      apellidos: '',
      cedula: '',
      correo: '',
      contrasena: generarContrasena(),
      conexion: hoy,
      rol: 'estudiante',
      sector: '',
      paciente: ''
    }));
    setEstudiantes(lista);
  };

  const handleChange = (index, campo, valor) => {
    const copia = [...estudiantes];
    copia[index][campo] = valor;
    setEstudiantes(copia);
  };

  const asignarSectorGlobal = (sector) => {
    const actualizados = estudiantes.map(e => ({ ...e, sector }));
    setEstudiantes(actualizados);
    setSectorGlobal(sector);
  };

  const asignarPacientesAleatorios = () => {
    if (estudiantes.length > PACIENTES_SIMULADOS.length) {
      alert('No hay suficientes pacientes únicos para asignar.');
      return;
    }
    const pacientesDisponibles = [...PACIENTES_SIMULADOS].sort(() => 0.5 - Math.random());
    const actualizados = estudiantes.map((e, i) => ({
      ...e,
      paciente: pacientesDisponibles[i]
    }));
    setEstudiantes(actualizados);
  };

  const guardarTodos = () => {
    const existentes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    const actualizados = [...existentes, ...estudiantes];
    localStorage.setItem('estudiantes', JSON.stringify(actualizados));
    alert('Estudiantes guardados exitosamente');
    navigate('/estudiantes');
  };

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/estudiantes')}>
        ← Volver a Estudiantes
      </Button>

      <h4>Registrar Múltiples Estudiantes</h4>

      <Form.Group className="mb-3 w-25">
        <Form.Label>Cantidad de estudiantes</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese un número entre 1 y 20"
          value={cantidad}
          onChange={handleCantidadChange}
          isInvalid={!!errorCantidad}
        />
        <Form.Control.Feedback type="invalid">{errorCantidad}</Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        className="mb-3 me-2"
        onClick={generarListaEstudiantes}
        disabled={!!errorCantidad || cantidad === ''}
      >
        Generar lista
      </Button>

      {estudiantes.length > 0 && (
        <div className="mb-3 d-flex align-items-center gap-2">

          <Form.Select
            className="w-auto"
            value={sectorGlobal}
            onChange={(e) => asignarSectorGlobal(e.target.value)}
          >
            <option value="">Asignar sector a todos</option>
            {SECTORES.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </Form.Select>

          <Button variant="warning" onClick={asignarPacientesAleatorios}>
            Asignar pacientes aleatorios
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => setMostrarContrasenas(prev => !prev)}
          >
            {mostrarContrasenas ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}
          </Button>

        </div>
      )}

      {estudiantes.length > 0 && (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Cédula</th>
                <th>Correo</th>
                <th>Sector</th>
                <th>Contraseña</th>
                <th>Paciente</th>
              </tr>
            </thead>

            <tbody>
              {estudiantes.map((est, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{est.estuid}</td>
                  <td>
                    <Form.Control
                      value={est.nombres}
                      onChange={(e) => handleChange(i, 'nombres', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      value={est.apellidos}
                      onChange={(e) => handleChange(i, 'apellidos', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      value={est.cedula}
                      onChange={(e) => handleChange(i, 'cedula', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="email"
                      value={est.correo}
                      onChange={(e) => handleChange(i, 'correo', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={est.sector}
                      onChange={(e) => handleChange(i, 'sector', e.target.value)}
                    >
                      <option value="">—</option>
                      {SECTORES.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type={mostrarContrasenas ? 'text' : 'password'}
                      value={est.contrasena}
                      onChange={(e) => handleChange(i, 'contrasena', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={est.paciente}
                      onChange={(e) => handleChange(i, 'paciente', e.target.value)}
                    >
                      <option value="">—</option>
                      {PACIENTES_SIMULADOS.map((p, idx) => (
                        <option key={idx} value={p}>{p}</option>
                      ))}
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={() => navigate('/estudiantes')}>Cancelar</Button>
            <Button variant="success" onClick={guardarTodos}>Guardar estudiantes</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AgregarEstudiantes;
