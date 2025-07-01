import React, { useState } from 'react';
import { Form, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import './AgendarFicha.css';

const AgendarFicha = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const totalSteps = 4;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Datos enviados:', formData);
    alert('Ficha registrada con éxito.');
  };

  return (
    <div className="container mt-4">
      <h4>Registro de Ficha Clínica</h4>
      <ProgressBar now={(step / totalSteps) * 100} label={`Paso ${step} de ${totalSteps}`} className="mb-4" />

      <div className="slide-form-container">
        {/* Paso 1 */}
        <div className={`form-step ${step === 1 ? 'active' : ''}`}>
          <h5>Paso 1: Datos del Paciente</h5>
          <Form>
            <Row>
              <Col md={6}><Form.Group><Form.Label>Nombre del paciente</Form.Label><Form.Control name="nombre_paciente" onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Apellido del paciente</Form.Label><Form.Control name="apellido_paciente" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mt-3">
              <Col md={4}><Form.Group><Form.Label>Edad</Form.Label><Form.Control name="edad" type="number" onChange={handleChange} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Género</Form.Label><Form.Select name="genero" onChange={handleChange}><option value="">Seleccione</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option></Form.Select></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Fecha de nacimiento</Form.Label><Form.Control name="fecha_nacimiento" type="date" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}><Form.Group><Form.Label>Escuela</Form.Label><Form.Control name="escuela" onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Grado</Form.Label><Form.Control name="grado" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}><Form.Group><Form.Label>Nombre del tutor</Form.Label><Form.Control name="nombre_tutor" onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Teléfono de contacto</Form.Label><Form.Control name="telefono_tutor" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}><Form.Group><Form.Label>Correo de contacto</Form.Label><Form.Control name="correo_tutor" type="email" onChange={handleChange} /></Form.Group></Col>
            </Row>
          </Form>
        </div>

        {/* Paso 2 */}
        <div className={`form-step ${step === 2 ? 'active' : ''}`}>
          <h5>Paso 2: Antecedentes Médicos</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Motivo de consulta</Form.Label>
              <Form.Control as="textarea" rows={3} name="motivo_consulta" onChange={handleChange} />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Inicio de los síntomas</Form.Label><Form.Select name="inicio_sintomas" onChange={handleChange}><option value="">Seleccione</option><option value="Gradual">Gradual</option><option value="Repentino">Repentino</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Descripción de los síntomas</Form.Label><Form.Control name="descripcion_sintomas" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Form.Group className="mb-3"><Form.Label>Factores que agravan o alivian</Form.Label><Form.Control as="textarea" rows={2} name="factores_sintomas" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Tratamientos previos recibidos</Form.Label><Form.Control as="textarea" rows={2} name="tratamientos_previos" onChange={handleChange} /></Form.Group>
            <hr />
            <h6>Antecedentes personales</h6>
            <Form.Group className="mb-2"><Form.Label>Enfermedades importantes</Form.Label><Form.Control name="enfermedades_importantes" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Cirugías previas</Form.Label><Form.Control name="cirugias_previas" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Hospitalizaciones</Form.Label><Form.Control name="hospitalizaciones" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Alergias</Form.Label><Form.Control name="alergias" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Medicamentos actuales</Form.Label><Form.Control name="medicamentos_actuales" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Vacunación completa</Form.Label><Form.Select name="vacunacion_completa" onChange={handleChange}><option value="">Seleccione</option><option value="Sí">Sí</option><option value="No">No</option></Form.Select></Form.Group>
            <hr />
            <h6>Antecedentes familiares</h6>
            <Form.Group className="mb-2"><Form.Label>Enfermedades musculoesqueléticas en la familia</Form.Label><Form.Control name="enf_musculoesqueleticas_familia" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Otras condiciones hereditarias</Form.Label><Form.Control name="otras_condiciones_hereditarias" onChange={handleChange} /></Form.Group>
          </Form>
        </div>

        {/* Paso 3 */}
        <div className={`form-step ${step === 3 ? 'active' : ''}`}>
          <h5>Paso 3: Evaluación Fisioterapéutica</h5>
          <Form>
            {["evaluacion_postura", "evaluacion_marcha", "rango_articular", "fuerza_muscular", "tono_muscular", "coordinacion", "equilibrio", "sensibilidad", "reflejos", "pruebas_especiales", "observaciones_evaluacion"].map((campo, idx) => (
              <Form.Group className="mb-3" key={idx}>
                <Form.Label>{campo.replaceAll("_", " ")}</Form.Label>
                <Form.Control as="textarea" rows={2} name={campo} onChange={handleChange} />
              </Form.Group>
            ))}
          </Form>
        </div>

        {/* Paso 4 */}
        <div className={`form-step ${step === 4 ? 'active' : ''}`}>
          <h5>Paso 4: Diagnóstico y Plan de Intervención</h5>
          <Form>
            <Form.Group className="mb-3"><Form.Label>Diagnóstico fisioterapéutico</Form.Label><Form.Control as="textarea" rows={2} name="diagnostico_fisioterapeutico" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Objetivos terapéuticos</Form.Label><Form.Control as="textarea" rows={2} name="objetivos_terapeuticos" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Plan de intervención</Form.Label><Form.Control as="textarea" rows={3} name="plan_intervencion" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Frecuencia del tratamiento</Form.Label><Form.Control name="frecuencia_tratamiento" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Duración del tratamiento</Form.Label><Form.Control name="duracion_tratamiento" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Evaluación final / Criterios de alta</Form.Label><Form.Control as="textarea" rows={2} name="criterios_alta" onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Observaciones adicionales</Form.Label><Form.Control as="textarea" rows={2} name="observaciones_finales" onChange={handleChange} /></Form.Group>
          </Form>
        </div>
      </div>

      {/* Botones */}
      <div className="d-flex justify-content-between mt-4">
        <Button disabled={step === 1} onClick={prevStep}>Anterior</Button>
        {step < totalSteps ? (
          <Button onClick={nextStep}>Siguiente</Button>
        ) : (
          <Button variant="success" onClick={handleSubmit}>Finalizar</Button>
        )}
      </div>
    </div>
  );
};

export default AgendarFicha;
