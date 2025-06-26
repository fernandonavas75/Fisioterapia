const {
  HistoriaClinica,
  Antecedentes,
  EvaluacionPostural,
  FuerzaMuscular,
  InformeFinal,
  Seguimiento
} = require('../models/associations');

exports.crearHistoriaCompleta = async (req, res) => {
  const t = await HistoriaClinica.sequelize.transaction();
  try {
    const {
      historia,
      antecedentes,
      evaluacionPostural,
      fuerzaMuscular,
      informeFinal,
      seguimientos // array de objetos con intervenciones y observaciones
    } = req.body;

    // 1. Crear historia clínica principal
    const nuevaHistoria = await HistoriaClinica.create(historia, { transaction: t });

    // 2. Insertar antecedentes
    await Antecedentes.create({
      ...antecedentes,
      id_historia: nuevaHistoria.id_historia
    }, { transaction: t });

    // 3. Insertar evaluación postural
    await EvaluacionPostural.create({
      ...evaluacionPostural,
      id_historia: nuevaHistoria.id_historia
    }, { transaction: t });

    // 4. Insertar fuerza muscular (array)
    for (const fm of fuerzaMuscular) {
      await FuerzaMuscular.create({
        ...fm,
        id_historia: nuevaHistoria.id_historia
      }, { transaction: t });
    }

    // 5. Insertar informe final
    await InformeFinal.create({
      ...informeFinal,
      id_historia: nuevaHistoria.id_historia
    }, { transaction: t });

    // 6. Insertar seguimientos (array)
    if (seguimientos && Array.isArray(seguimientos)) {
      for (const seg of seguimientos) {
        await Seguimiento.create({
          ...seg,
          id_historia: nuevaHistoria.id_historia
        }, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json({ message: 'Historia clínica completa creada con seguimiento' });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error al crear la historia clínica con seguimiento' });
  }
};
