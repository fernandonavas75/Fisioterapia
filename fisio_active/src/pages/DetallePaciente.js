import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const DetallePaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Datos quemados para varios pacientes
  const pacientes = [
    {
      id: '1',
      nombres: 'Lucía',
      apellidos: 'Pérez',
      edad: 10,
      genero: 'Femenino',
      fecha_nacimiento: '2014-03-12',
      peso: 35,
      estatura: 140,
      escuela: 'Unidad Educativa Quito',
      grado: '5to',
      nombre_tutor: 'María Pérez',
      telefono_tutor: '0991234567',
      correo_tutor: 'maria.tutor@gmail.com',
      historias: [
        {
          id: 1,
          fecha_evaluacion: '2025-06-06',
          motivo_consulta: 'Dolor en espalda baja',
          historia_condicion_actual: 'Dolor persistente tras actividad física',
          diagnostico_preliminar: 'Hipotonía lumbar',
          plan_intervencion: 'Ejercicios de fortalecimiento lumbar',
          estudiante: 'Andrea López',
        }
      ],
      antecedentes: {
        enfermedades_importantes: 'Asma leve',
        cirugias_previas: 'Ninguna',
        hospitalizaciones: '1 vez por bronquitis',
        alergias: 'Ninguna',
        medicamentos_actuales: 'Salbutamol',
        vacunacion_completa: true,
        enf_musculoesqueleticas_familia: 'Ninguna',
        condiciones_hereditarias: 'Hipermovilidad',
      },
      seguimientos: [
        {
          fecha: '2025-06-10',
          intervenciones: 'Estiramientos guiados',
          observaciones: 'Buena respuesta al tratamiento',
        }
      ]
    },
    {
      id: '2',
      nombres: 'Mateo',
      apellidos: 'Rodríguez',
      edad: 11,
      genero: 'Masculino',
      fecha_nacimiento: '2013-06-22',
      peso: 38,
      estatura: 145,
      escuela: 'Escuela Los Andes',
      grado: '6to',
      nombre_tutor: 'Luis Rodríguez',
      telefono_tutor: '0987654321',
      correo_tutor: 'luis.padre@gmail.com',
      historias: [
        {
          id: 2,
          fecha_evaluacion: '2025-06-12',
          motivo_consulta: 'Dolor cervical',
          historia_condicion_actual: 'Molestia al girar el cuello',
          diagnostico_preliminar: 'Tensión cervical',
          plan_intervencion: 'Masajes y corrección postural',
          estudiante: 'Carlos García',
        }
      ],
      antecedentes: {
        enfermedades_importantes: 'Ninguna',
        cirugias_previas: 'Ninguna',
        hospitalizaciones: 'Ninguna',
        alergias: 'Polen',
        medicamentos_actuales: 'Loratadina',
        vacunacion_completa: true,
        enf_musculoesqueleticas_familia: 'Escoliosis',
        condiciones_hereditarias: 'Asma',
      },
      seguimientos: [
        {
          fecha: '2025-06-15',
          intervenciones: 'Ejercicios de estiramiento cervical',
          observaciones: 'Leve mejora observada',
        }
      ]
    }
  ];

  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return <div className="container py-4">Paciente no encontrado</div>;

  const { historias, antecedentes, seguimientos } = paciente;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Resumen del Paciente</h3>
        <Button variant="outline-primary" onClick={() => navigate('/pacientes')}>
          <i className="bi bi-arrow-left"></i> Volver al listado
        </Button>
      </div>

      {/* Datos del Paciente */}
      <Card className="mb-4">
        <Card.Header><strong>Datos del Paciente</strong></Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}><b>Nombres:</b> {paciente.nombres}</Col>
            <Col md={4}><b>Apellidos:</b> {paciente.apellidos}</Col>
            <Col md={4}><b>Edad:</b> {paciente.edad}</Col>
            <Col md={4}><b>Género:</b> {paciente.genero}</Col>
            <Col md={4}><b>Fecha nacimiento:</b> {paciente.fecha_nacimiento}</Col>
            <Col md={4}><b>Peso:</b> {paciente.peso} kg</Col>
            <Col md={4}><b>Estatura:</b> {paciente.estatura} cm</Col>
            <Col md={4}><b>Escuela:</b> {paciente.escuela}</Col>
            <Col md={4}><b>Grado:</b> {paciente.grado}</Col>
            <Col md={4}><b>Tutor:</b> {paciente.nombre_tutor}</Col>
            <Col md={4}><b>Teléfono tutor:</b> {paciente.telefono_tutor}</Col>
            <Col md={4}><b>Correo tutor:</b> {paciente.correo_tutor}</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Historia Clínica y Estudiantes */}
      <Card className="mb-4">
        <Card.Header><strong>Historia Clínica y Atención</strong></Card.Header>
        <Card.Body>
          <p><b>Estudiantes que lo atendieron:</b> {historias.map(h => h.estudiante).join(', ')}</p>
          <p><b>Total de fichas recolectadas:</b> {historias.length}</p>
          <p><b>Última fecha de evaluación:</b> {historias[0].fecha_evaluacion}</p>
          <p><b>Último diagnóstico preliminar:</b> {historias[0].diagnostico_preliminar}</p>
          <p><b>Plan de intervención:</b> {historias[0].plan_intervencion}</p>
        </Card.Body>
      </Card>

      {/* Antecedentes */}
      <Card className="mb-4">
        <Card.Header><strong>Antecedentes</strong></Card.Header>
        <Card.Body>
          <Row>
            {Object.entries(antecedentes).map(([key, value]) => (
              <Col md={6} className="mb-2" key={key}>
                <b>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</b>{' '}
                {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value || '-'}
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Últimos seguimientos */}
      <Card className="mb-4">
        <Card.Header><strong>Últimos Seguimientos</strong></Card.Header>
        <Card.Body>
          {seguimientos.map((s, idx) => (
            <div key={idx} className="mb-3">
              <p><b>Fecha:</b> {s.fecha}</p>
              <p><b>Intervenciones:</b> {s.intervenciones}</p>
              <p><b>Observaciones:</b> {s.observaciones}</p>
              <hr />
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetallePaciente;
