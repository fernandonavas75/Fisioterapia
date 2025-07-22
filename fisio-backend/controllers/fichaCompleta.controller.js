const { HistoriaClinica, Antecedentes, EvaluacionPostural, EvaluacionFuncional, FuerzaMuscular, InformeFinal, Seguimiento, FirmasConsentimientos } = require('../models');

exports.crearFichaCompleta = async (req, res) => {
  const datos = req.body;

  try {
    // Crear Historia Clínica
    const historia = await HistoriaClinica.create({
      id_paciente: new Number(datos.id_paciente),                // <-- AÑADIDO
      id_estudiante: new Number(datos.id_estudiante),            // <-- AÑADIDO
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      edad: datos.edad,
      estatura: datos.estatura,
      fechaNacimiento: new Date(datos.fechaNacimiento),
      fechaEvaluacion: new Date(datos.fecha_evaluacion).toISOString(),
      genero: datos.genero,
      escuela: datos.escuela,
      grado: datos.grado,
      nombresTutor: datos.nombresTutor,
      telefono_tutor: datos.telefono_tutor,
      correo_tutor: datos.correo_tutor
    });

    const historiaId = historia.id;

    // Crear registros relacionados
    await Antecedentes.create({ ...datos, historiaClinicaId: historiaId });
    await EvaluacionPostural.create({ ...datos, historiaClinicaId: historiaId });
    await EvaluacionFuncional.create({ ...datos, historiaClinicaId: historiaId });
    await FuerzaMuscular.create({ ...datos.tablaFuerzaMuscular, historiaClinicaId: historiaId });
    await InformeFinal.create({ ...datos, historiaClinicaId: historiaId });

    // Guardar seguimiento solo si tiene datos válidos
    if (Array.isArray(datos.seguimiento)) {
      const seguimientoValido = datos.seguimiento.filter(
        seg => seg.fecha || seg.observaciones || seg.intervenciones
      );

      for (const seg of seguimientoValido) {
        await Seguimiento.create({ ...seg, historiaClinicaId: historiaId });
      }
    }

    await FirmasConsentimientos.create({
      historiaClinicaId: historiaId,
      seguimiento1Fecha: datos.seguimiento1Fecha,
      seguimiento1Observaciones: datos.seguimiento1Observaciones,
      seguimiento2Fecha: datos.seguimiento2Fecha,
      seguimiento2Observaciones: datos.seguimiento2Observaciones,
      nombreEvaluador: datos.nombreEvaluador,
      firmaEvaluador: datos.firmaEvaluador,
      nombreTutor: datos.nombreTutor,
      firmaTutor: datos.firmaTutor,
      nombrePaciente: datos.nombrePaciente,
      edadPaciente: datos.edadPaciente
    });

    return res.status(201).json({ mensaje: "Ficha creada correctamente." });
  } catch (error) {
    console.error("Error al guardar la ficha completa:", error);
    return res.status(500).json({ error: "Error al guardar la ficha." });
  }
};
