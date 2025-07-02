import { useState } from 'react';
import './AgendarFicha.css';


const FormularioHistoriaClinica = () => {
  const [paso, setPaso] = useState(1);
  const [formulario, setFormulario] = useState({
    // Paso 1
    nombres: '',
    apellidos: '',
    edad: '',
    genero: '',
    peso: '',
    estatura: '',
    fechaNacimiento: '',
    fechaEvaluacion: '',
    escuela: '',
    grado: '',
    nombresTutor: '',
    telefonoTutor: '',
    correoTutor: '',

    // Paso 2
    enfermedadesImportantes: '',
    cirugiasPrevias: '',
    hospitalizaciones: '',
    alergias: '',
    medicamentosActuales: '',
    vacunacionCompleta: '',
    enfMusculoesqueleticas: '',
    condicionesHereditarias: '',
    motivoConsulta: '',
    inicioSintomas: '',
    descripcionSintomas: '',
    factoresSintomas: '',
    tratamientosPrevios: '',

    // Paso 3
    cabezaCuello: '',
    hombros: '',
    columna: '',
    pelvis: '',
    extremidades: '',
    arcoPlantar: '',
    puntosDolorosos: '',
    evaDolor: 0,
    tejidosBlandos: '',
    estructurasOseas: '',


     // Paso 4
    marcha: '',
    marchaDescripcion: '',
    equilibrio: '',
    rangoMovimiento: '',
    rangoMovimientoAreas: '',
    fuerzaMuscular: '',
    fuerzaMuscularAreas: '',
    tablaFuerzaMuscular: {
      cuello: '',
      hombro: '',
      codo: '',
      muneca: '',
      dedos: '',
      cadera: '',
      rodilla: '',
      tobillo: '',
      pie: '',
    // Nuevos campos (Miembro inferior y Tronco)
      caderaFlexion: '',
      caderaExtension: '',
      caderaAbduccion: '',
      caderaAduccion: '',
      rodillaFlexion: '',
      rodillaExtension: '',
      tobilloDorsiflexion: '',
      tobilloPlantiflexion: '',
      pieInversion: '',
      pieEversion: '',
      troncoFlexion: '',
      troncoExtension: '',
      troncoRotacion: '',
    
      testAdams: '',
      testJack: '',
      otrasPruebas: '',
      diagnosticoPreliminar: '',
      
      // Paso 5
      objetivos: '',
      fortalecimiento: '',
      estiramiento: '',
      reeducacionPostural: '',
      otrasTecnicas: '',
      calzadoAdecuado: '',
      especificarCalzado: '',
      actividadesRecomendadas: '',
      restricciones: '',
      seguimiento1Fecha: '',
      seguimiento1Observaciones: '',
      seguimiento2Fecha: '',
      seguimiento2Observaciones: '',
      firmaEvaluador: '',
      nombreEvaluador: '',
      firmaTutor: '',
      nombreTutor: '',
    }

    });

    
    


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const siguientePaso = () => setPaso(paso + 1);
  const pasoAnterior = () => setPaso(paso - 1);

  return (
    <div className="container mt-4">
      {paso === 1 && (
        <div>
          <h5>Datos del paciente</h5>
          <div className="row">
            <div className="col-md-6">
              <input type="text" className="form-control mb-2" name="nombres" placeholder="Nombres" value={formulario.nombres} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="edad" placeholder="Edad" value={formulario.edad} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="peso" placeholder="Peso (kg)" value={formulario.peso} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="estatura" placeholder="Estatura (cm)" value={formulario.estatura} onChange={handleChange} />
              <input type="date" className="form-control mb-2" name="fechaNacimiento" placeholder="Fecha de nacimiento" value={formulario.fechaNacimiento} onChange={handleChange} />
              <input type="date" className="form-control mb-2" name="fechaEvaluacion" placeholder="Fecha de evaluación" value={formulario.fechaEvaluacion} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control mb-2" name="apellidos" placeholder="Apellidos" value={formulario.apellidos} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="genero" placeholder="Género" value={formulario.genero} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="escuela" placeholder="Escuela" value={formulario.escuela} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="grado" placeholder="Grado" value={formulario.grado} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="nombresTutor" placeholder="Nombre del tutor" value={formulario.nombresTutor} onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="telefonoTutor" placeholder="Teléfono del tutor" value={formulario.telefonoTutor} onChange={handleChange} />
              <input type="email" className="form-control mb-2" name="correoTutor" placeholder="Correo electrónico del tutor" value={formulario.correoTutor} onChange={handleChange} />
            </div>
          </div>
          <button className="btn btn-primary mt-3" onClick={siguientePaso}>Siguiente</button>
        </div>
      )}

      {paso === 2 && (
        <div>
          <h5>Antecedentes médicos y motivo de consulta</h5>
          <h5>Antecedentes personales</h5>
          <textarea className="form-control mb-2" name="enfermedadesImportantes" placeholder="Enfermedades importantes" value={formulario.enfermedadesImportantes} onChange={handleChange}></textarea>
          <textarea className="form-control mb-2" name="cirugiasPrevias" placeholder="Cirugías previas" value={formulario.cirugiasPrevias} onChange={handleChange}></textarea>
          <textarea className="form-control mb-2" name="hospitalizaciones" placeholder="Hospitalizaciones" value={formulario.hospitalizaciones} onChange={handleChange}></textarea>
          <textarea className="form-control mb-2" name="alergias" placeholder="Alergias" value={formulario.alergias} onChange={handleChange}></textarea>
          <textarea className="form-control mb-2" name="medicamentosActuales" placeholder="Medicamentos actuales" value={formulario.medicamentosActuales} onChange={handleChange}></textarea>

          <div className="mb-3">
            <label className="form-label d-block">Vacunación completa:</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="vacunacionCompleta"
                value="Sí"
                checked={formulario.vacunacionCompleta === "Sí"}
                onChange={handleChange}
              />
              <label className="form-check-label">Sí</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="vacunacionCompleta"
                value="No"
                checked={formulario.vacunacionCompleta === "No"}
                onChange={handleChange}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
          <h5>Antecedentes familiares</h5>
              <textarea className="form-control mb-2" name="enfMusculoesqueleticas" placeholder="Enf. musculoesqueléticas familiares" value={formulario.enfMusculoesqueleticas} onChange={handleChange}></textarea>
              <textarea className="form-control mb-2" name="condicionesHereditarias" placeholder="Otras condiciones hereditarias" value={formulario.condicionesHereditarias} onChange={handleChange}></textarea>
              <textarea className="form-control mb-2" name="motivoConsulta" placeholder="Motivo de consulta" value={formulario.motivoConsulta} onChange={handleChange}></textarea>

              <div className="mb-3">
                <label className="form-label d-block">Inicio de síntomas:</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inicioSintomas"
                    value="Gradual"
                    checked={formulario.inicioSintomas === "Gradual"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Gradual</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inicioSintomas"
                    value="Repentino"
                    checked={formulario.inicioSintomas === "Repentino"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Repentino</label>
                </div>
              </div>
              <textarea className="form-control mb-2" name="descripcionSintomas" placeholder="Descripción de los síntomas" value={formulario.descripcionSintomas} onChange={handleChange}></textarea>
              <textarea className="form-control mb-2" name="factoresSintomas" placeholder="Factores que agravan o alivian" value={formulario.factoresSintomas} onChange={handleChange}></textarea>
              <textarea className="form-control mb-2" name="tratamientosPrevios" placeholder="Tratamientos previos" value={formulario.tratamientosPrevios} onChange={handleChange}></textarea>

              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary mt-3" onClick={pasoAnterior}>Anterior</button>
                <button className="btn btn-primary mt-3" onClick={siguientePaso}>Siguiente</button>
              </div>
            </div>
          )}

          {paso === 3 && (
            <div>
              <h5>Evaluación fisioterapéutica</h5>

              {/* Alineación cabeza y cuello */}
              <input type="text" className="form-control mb-2" name="cabezaCuello" placeholder="Alineación de cabeza y cuello" value={formulario.cabezaCuello} onChange={handleChange} />

              {/* Hombros */}
              <div className="mb-2">
                <label className="form-label d-block">Hombros:</label>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="hombros" value="Simétricos" checked={formulario.hombros === "Simétricos"} onChange={handleChange} />
                  <label className="form-check-label">Simétricos</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="hombros" value="Asimétricos" checked={formulario.hombros === "Asimétricos"} onChange={handleChange} />
                  <label className="form-check-label">Asimétricos</label>
                </div>
              </div>

              {/* Columna */}
              <div className="mb-2">
                <label className="form-label d-block">Columna vertebral:</label>
                {["Recta", "Escoliosis", "Cifosis", "Lordosis"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="columna" value={opcion} checked={formulario.columna === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
              </div>

              {/* Pelvis */}
              <div className="mb-2">
                <label className="form-label d-block">Pelvis:</label>
                {["Nivelada", "Inclinada"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="pelvis" value={opcion} checked={formulario.pelvis === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
              </div>

              {/* Extremidades inferiores */}
              <div className="mb-2">
                <label className="form-label d-block">Extremidades inferiores:</label>
                {["Alineadas", "Genu valgo", "Genu varo"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="extremidades" value={opcion} checked={formulario.extremidades === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
              </div>

              {/* Arco plantar */}
              <div className="mb-2">
                <label className="form-label d-block">Arco plantar:</label>
                {["Normal", "Pie plano", "Pie cavo"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="arcoPlantar" value={opcion} checked={formulario.arcoPlantar === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
              </div>

              {/* Puntos dolorosos */}
              <textarea className="form-control mb-2" name="puntosDolorosos" placeholder="Puntos dolorosos" value={formulario.puntosDolorosos} onChange={handleChange}></textarea>

              {/* EVA */}
              <div className="mb-3">
                <label className="form-label">EVA (Evaluación del dolor): {formulario.evaDolor}</label>
                <input
                  type="range"
                  className="form-range"
                  name="evaDolor"
                  min="0"
                  max="10"
                  step="1"
                  value={formulario.evaDolor}
                  onChange={handleChange}
                />
                <div className="d-flex justify-content-between">
                  <span>0</span>
                  <span>10</span>
                </div>
              </div>

              {/* Tejidos blandos */}
              <textarea className="form-control mb-2" name="tejidosBlandos" placeholder="Tejidos blandos" value={formulario.tejidosBlandos} onChange={handleChange}></textarea>

              {/* Estructuras óseas */}
              <textarea className="form-control mb-2" name="estructurasOseas" placeholder="Estructuras óseas" value={formulario.estructurasOseas} onChange={handleChange}></textarea>

              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary mt-3" onClick={pasoAnterior}>Anterior</button>
                <button className="btn btn-primary mt-3" onClick={siguientePaso}>Siguiente</button>
              </div>
            </div>
          )}

          {paso === 4 && (
            <div>
              <h5>Evaluación funcional</h5>

              {/* Marcha */}
              <div className="mb-2">
                <label className="form-label d-block">Marcha:</label>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="marcha" value="Normal" checked={formulario.marcha === "Normal"} onChange={handleChange} />
                  <label className="form-check-label">Normal</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="marcha" value="Alterada" checked={formulario.marcha === "Alterada"} onChange={handleChange} />
                  <label className="form-check-label">Alterada</label>
                </div>
                {formulario.marcha === "Alterada" && (
                  <input type="text" className="form-control mt-2" name="marchaDescripcion" placeholder="Describa la alteración" value={formulario.marchaDescripcion} onChange={handleChange} />
                )}
              </div>

              {/* Equilibrio */}
              <div className="mb-2">
                <label className="form-label d-block">Equilibrio:</label>
                {["Bueno", "Regular", "Malo"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="equilibrio" value={opcion} checked={formulario.equilibrio === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
              </div>

              {/* Rango de movimiento */}
              <div className="mb-2">
                <label className="form-label d-block">Rango de movimiento:</label>
                {["Normal", "Disminuido"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="rangoMovimiento" value={opcion} checked={formulario.rangoMovimiento === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
                {formulario.rangoMovimiento === "Disminuido" && (
                  <input type="text" className="form-control mt-2" name="rangoMovimientoAreas" placeholder="Áreas afectadas" value={formulario.rangoMovimientoAreas} onChange={handleChange} />
                )}
              </div>

              {/* Fuerza muscular general */}
              <div className="mb-2">
                <label className="form-label d-block">Fuerza muscular:</label>
                {["Normal", "Disminuida"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="fuerzaMuscular" value={opcion} checked={formulario.fuerzaMuscular === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
                {formulario.fuerzaMuscular === "Disminuida" && (
                  <input type="text" className="form-control mt-2" name="fuerzaMuscularAreas" placeholder="Áreas afectadas" value={formulario.fuerzaMuscularAreas} onChange={handleChange} />
                )}
              </div>

              {/* Tabla fuerza muscular */}
              <div className="mt-4">
                <h6>Valoración por grupo muscular (0 a 5)</h6>
                <h6>Miembro Superior</h6>
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Grupo Muscular / Movimiento Clave</th>
                        {[0, 1, 2, 3, 4, 5].map(grado => <th key={grado}>Grado {grado}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Hombro: Flexión (Deltoides anterior, Coracobraquial)", key: "hombroFlexion" },
                        { label: "Hombro: Extensión (Dorsal ancho, Redondo mayor)", key: "hombroExtension" },
                        { label: "Hombro: Abducción (Deltoides medio, Supraespinoso)", key: "hombroAbduccion" },
                        { label: "Hombro: Aducción (Pectoral mayor, Dorsal ancho)", key: "hombroAduccion" },
                        { label: "Codo: Flexión (Bíceps braquial, Braquial)", key: "codoFlexion" },
                        { label: "Codo: Extensión (Tríceps braquial)", key: "codoExtension" },
                        { label: "Muñeca: Extensión (Extensores del carpo)", key: "munecaExtension" },
                        { label: "Muñeca: Flexión (Flexores del carpo)", key: "munecaFlexion" },
                        { label: "Dedos: Flexión (Flexores de dedos)", key: "dedosFlexion" },
                        { label: "Dedos: Extensión (Extensores de dedos)", key: "dedosExtension" },
                        { label: "Pulgar: Oposición (Oponente del pulgar)", key: "pulgar" }
                      ].map(({ label, key }) => (
                        <tr key={key}>
                          <td>{label}</td>
                          {[0, 1, 2, 3, 4, 5].map(grado => (
                            <td key={grado}>
                              <input
                                type="radio"
                                name={key}
                                value={grado}
                                checked={formulario.tablaFuerzaMuscular[key] === String(grado)}
                                onChange={(e) =>
                                  setFormulario({
                                    ...formulario,
                                    tablaFuerzaMuscular: {
                                      ...formulario.tablaFuerzaMuscular,
                                      [key]: e.target.value
                                    }
                                  })
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h6>Miembro Inferior</h6>
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Grupo Muscular / Movimiento Clave</th>
                        {[0, 1, 2, 3, 4, 5].map(grado => <th key={grado}>Grado {grado}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Cadera: Flexión (Iliopsoas)", key: "caderaFlexion" },
                        { label: "Cadera: Extensión (Glúteo mayor, Isquiotibiales)", key: "caderaExtension" },
                        { label: "Cadera: Abducción (Glúteo medio y menor)", key: "caderaAbduccion" },
                        { label: "Cadera: Aducción (Aductores)", key: "caderaAduccion" },
                        { label: "Rodilla: Flexión (Isquiotibiales)", key: "rodillaFlexion" },
                        { label: "Rodilla: Extensión (Cuádriceps)", key: "rodillaExtension" },
                        { label: "Tobillo: Dorsiflexión (Tibial anterior)", key: "tobilloDorsiflexion" },
                        { label: "Tobillo: Plantiflexión (Gastroc/Sóleo)", key: "tobilloPlantiflexion" },
                        { label: "Pie: Inversión (Tibial posterior)", key: "pieInversion" },
                        { label: "Pie: Eversión (Peroneos)", key: "pieEversion" }
                      ].map(({ label, key }) => (
                        <tr key={key}>
                          <td>{label}</td>
                          {[0, 1, 2, 3, 4, 5].map(grado => (
                            <td key={grado}>
                              <input
                                type="radio"
                                name={key}
                                value={grado}
                                checked={formulario.tablaFuerzaMuscular[key] === String(grado)}
                                onChange={(e) =>
                                  setFormulario({
                                    ...formulario,
                                    tablaFuerzaMuscular: {
                                      ...formulario.tablaFuerzaMuscular,
                                      [key]: e.target.value
                                    }
                                  })
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h6>Tronco</h6>
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Grupo Muscular / Movimiento Clave</th>
                        {[0, 1, 2, 3, 4, 5].map(grado => <th key={grado}>Grado {grado}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Tronco: Flexión (Recto abdominal, Oblicuos)", key: "troncoFlexion" },
                        { label: "Tronco: Extensión (Erectores de columna, Cuadrado lumbar)", key: "troncoExtension" },
                        { label: "Tronco: Rotación (Oblicuos internos y externos)", key: "troncoRotacion" }
                      ].map(({ label, key }) => (
                        <tr key={key}>
                          <td>{label}</td>
                          {[0, 1, 2, 3, 4, 5].map(grado => (
                            <td key={grado}>
                              <input
                                type="radio"
                                name={key}
                                value={grado}
                                checked={formulario.tablaFuerzaMuscular[key] === String(grado)}
                                onChange={(e) =>
                                  setFormulario({
                                    ...formulario,
                                    tablaFuerzaMuscular: {
                                      ...formulario.tablaFuerzaMuscular,
                                      [key]: e.target.value
                                    }
                                  })
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <h6 className="mt-4">Pruebas específicas</h6>
                  {/* Test de Adams */}
                  <div className="mb-2">
                    <label className="form-label d-block">Test de Adams (escoliosis):</label>
                    {["Positivo", "Negativo"].map(valor => (
                      <div className="form-check form-check-inline" key={valor}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="testAdams"
                          value={valor}
                          checked={formulario.testAdams === valor}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">{valor}</label>
                      </div>
                    ))}
                  </div>

                  {/* Test de Jack */}
                  <div className="mb-2">
                    <label className="form-label d-block">Test de Jack (pie plano):</label>
                    {["Positivo", "Negativo"].map(valor => (
                      <div className="form-check form-check-inline" key={valor}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="testJack"
                          value={valor}
                          checked={formulario.testJack === valor}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">{valor}</label>
                      </div>
                    ))}
                  </div>

                  {/* Otras pruebas */}
                  <div className="mb-3">
                    <label className="form-label">Otras pruebas realizadas:</label>
                    <textarea
                      className="form-control"
                      name="otrasPruebas"
                      placeholder="Describa otras pruebas específicas realizadas"
                      value={formulario.otrasPruebas}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Diagnóstico fisioterapéutico */}
                  <div className="mb-3">
                    <label className="form-label">Diagnóstico fisioterapéutico preliminar:</label>
                    <textarea
                      className="form-control"
                      name="diagnosticoPreliminar"
                      placeholder="Escriba el diagnóstico preliminar"
                      value={formulario.diagnosticoPreliminar}
                      onChange={handleChange}
                    />
                  </div>

              </div>
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-secondary" onClick={pasoAnterior}>Anterior</button>
                <button className="btn btn-primary mt-3" onClick={siguientePaso}>Siguiente</button>
              </div>
            </div>
          )}

          {paso === 5 && (
            <div>
              <h5>Plan de intervención</h5>

              <label className="form-label">1. Objetivos: (corto, mediano y largo plazo)</label>
              <textarea className="form-control mb-3" name="objetivos" value={formulario.objetivos} onChange={handleChange}></textarea>

              <label className="form-label">2. Tratamiento fisioterapéutico propuesto:</label>
              <textarea className="form-control mb-2" placeholder="Ejercicios de fortalecimiento" name="fortalecimiento" value={formulario.fortalecimiento} onChange={handleChange}></textarea>
              <textarea className="form-control mb-2" placeholder="Ejercicios de estiramiento" name="estiramiento" value={formulario.estiramiento} onChange={handleChange}></textarea>
              <textarea className="form-control mb-2" placeholder="Reeducación postural" name="reeducacionPostural" value={formulario.reeducacionPostural} onChange={handleChange}></textarea>
              <textarea className="form-control mb-3" placeholder="Otras técnicas" name="otrasTecnicas" value={formulario.otrasTecnicas} onChange={handleChange}></textarea>

              <label className="form-label">3. Recomendaciones generales:</label>
              <div className="mb-2">
                <label className="form-label d-block">Uso de calzado adecuado:</label>
                {["Sí", "No", "No Especificar"].map(opcion => (
                  <div className="form-check form-check-inline" key={opcion}>
                    <input className="form-check-input" type="radio" name="calzadoAdecuado" value={opcion} checked={formulario.calzadoAdecuado === opcion} onChange={handleChange} />
                    <label className="form-check-label">{opcion}</label>
                  </div>
                ))}
                {formulario.calzadoAdecuado === "No Especificar" && (
                  <input className="form-control mt-2" type="text" name="especificarCalzado" placeholder="Especificar" value={formulario.especificarCalzado} onChange={handleChange} />
                )}
              </div>
              <textarea className="form-control mb-2" placeholder="Actividades físicas recomendadas" name="actividadesRecomendadas" value={formulario.actividadesRecomendadas} onChange={handleChange}></textarea>
              <textarea className="form-control mb-3" placeholder="Restricciones o precauciones" name="restricciones" value={formulario.restricciones} onChange={handleChange}></textarea>

              <label className="form-label">Notas de seguimiento:</label>
              <div className="mb-2">
                <input type="date" className="form-control mb-1" name="seguimiento1Fecha" value={formulario.seguimiento1Fecha} onChange={handleChange} />
                <textarea className="form-control mb-2" placeholder="Observaciones" name="seguimiento1Observaciones" value={formulario.seguimiento1Observaciones} onChange={handleChange}></textarea>
              </div>
              <div className="mb-2">
                <input type="date" className="form-control mb-1" name="seguimiento2Fecha" value={formulario.seguimiento2Fecha} onChange={handleChange} />
                <textarea className="form-control mb-2" placeholder="Observaciones" name="seguimiento2Observaciones" value={formulario.seguimiento2Observaciones} onChange={handleChange}></textarea>
              </div>

              <label className="form-label">Firmas:</label>
              <input className="form-control mb-2" type="text" placeholder="Nombre del evaluador" name="nombreEvaluador" value={formulario.nombreEvaluador} onChange={handleChange} />
              <input className="form-control mb-2" type="text" placeholder="Firma del evaluador" name="firmaEvaluador" value={formulario.firmaEvaluador} onChange={handleChange} />
              <input className="form-control mb-2" type="text" placeholder="Nombre del padre/madre o tutor" name="nombreTutor" value={formulario.nombreTutor} onChange={handleChange} />
              <input className="form-control mb-2" type="text" placeholder="Firma del tutor" name="firmaTutor" value={formulario.firmaTutor} onChange={handleChange} />

              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-secondary" onClick={pasoAnterior}>Anterior</button>
                <button className="btn btn-primary mt-3" onClick={siguientePaso}>Siguiente</button>
              </div>
            </div>
          )}

          {paso === 6 && (
            <div>
              <h5>Registro de Seguimiento y Evolución</h5>

              <div className="mb-3">
                <label className="form-label">Nombre del paciente:</label>
                <input type="text" className="form-control" name="nombrePaciente" value={formulario.nombrePaciente || ''} onChange={handleChange} />
              </div>

              <div className="mb-4">
                <label className="form-label">Edad:</label>
                <input type="number" className="form-control" name="edadPaciente" value={formulario.edadPaciente || ''} onChange={handleChange} />
              </div>

              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div className="border rounded p-3 mb-4" key={index}>
                  <h6>Registro #{index + 1}</h6>

                  <div className="mb-2">
                    <label className="form-label">Fecha:</label>
                    <input
                      type="date"
                      className="form-control"
                      name={`seguimiento[${index}].fecha`}
                      value={formulario.seguimiento?.[index]?.fecha || ''}
                      onChange={(e) => {
                        const nuevoSeguimiento = [...(formulario.seguimiento || [])];
                        nuevoSeguimiento[index] = {
                          ...nuevoSeguimiento[index],
                          fecha: e.target.value
                        };
                        setFormulario({ ...formulario, seguimiento: nuevoSeguimiento });
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Intervenciones realizadas:</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      name={`seguimiento[${index}].intervenciones`}
                      value={formulario.seguimiento?.[index]?.intervenciones || ''}
                      onChange={(e) => {
                        const nuevoSeguimiento = [...(formulario.seguimiento || [])];
                        nuevoSeguimiento[index] = {
                          ...nuevoSeguimiento[index],
                          intervenciones: e.target.value
                        };
                        setFormulario({ ...formulario, seguimiento: nuevoSeguimiento });
                      }}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Observaciones relevantes (disminución de dolor, aumento de fuerza muscular, mejora de movilidad, etc):
                    </label>
                    <textarea
                      rows="3"
                      className="form-control"
                      name={`seguimiento[${index}].observaciones`}
                      value={formulario.seguimiento?.[index]?.observaciones || ''}
                      onChange={(e) => {
                        const nuevoSeguimiento = [...(formulario.seguimiento || [])];
                        nuevoSeguimiento[index] = {
                          ...nuevoSeguimiento[index],
                          observaciones: e.target.value
                        };
                        setFormulario({ ...formulario, seguimiento: nuevoSeguimiento });
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-secondary" onClick={pasoAnterior}>Anterior</button>
                <button className="btn btn-success">Finalizar</button>
              </div>
            </div>
          )}




    </div>
  );
};

export default FormularioHistoriaClinica;