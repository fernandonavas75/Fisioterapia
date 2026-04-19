-- ============================================================
--  BASE DE DATOS - SISTEMA DE FISIOTERAPIA PODOLÓGICA v2
--  Cambios respecto a v1:
--    [MOD] HistoriaClinica  — estado de alta + diagnóstico definitivo + medidas antropométricas
--    [MOD] EvaluacionPostural — lateralidad (D/I) en hombros, pelvis y extremidades
--    [MOD] Seguimiento      — métricas de progreso por sesión
--    [NEW] Goniometria      — rangos de movimiento articular estructurados
--    [NEW] Archivo          — imágenes y documentos clínicos
--    [NEW] SupervisionDocente — validación académica por el docente
--    [NEW] Ortesis          — prescripción de plantillas y dispositivos
-- ============================================================


-- ============================================================
--  TABLAS SIN CAMBIOS
-- ============================================================

-- Tabla: Usuario
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'estudiante', 'docente')),
    contrasena TEXT NOT NULL,
    conexion DATE NOT NULL
);

-- Tabla: Paciente
CREATE TABLE Paciente (
    id_paciente SERIAL PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    genero VARCHAR(10) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

-- Tabla: Sector
CREATE TABLE Sector (
    id_sector SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla: PacienteEstudiante
CREATE TABLE PacienteEstudiante (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER NOT NULL REFERENCES Paciente(id_paciente),
    id_estudiante INTEGER NOT NULL REFERENCES Usuario(id_usuario),
    fecha_asignacion TIMESTAMP DEFAULT NOW(),
    UNIQUE (id_paciente, id_estudiante)
);

-- Tabla: PacienteSector
CREATE TABLE PacienteSector (
    id SERIAL PRIMARY KEY,
    id_paciente INTEGER NOT NULL REFERENCES Paciente(id_paciente),
    id_sector INTEGER NOT NULL REFERENCES Sector(id_sector),
    UNIQUE (id_paciente, id_sector)
);

-- Tabla: EstudianteSector
CREATE TABLE EstudianteSector (
    id SERIAL PRIMARY KEY,
    id_estudiante INTEGER NOT NULL REFERENCES Usuario(id_usuario),
    id_sector INTEGER NOT NULL REFERENCES Sector(id_sector),
    UNIQUE (id_estudiante, id_sector)
);

-- Tabla: Antecedentes
CREATE TABLE Antecedentes (
    id_historia INTEGER PRIMARY KEY REFERENCES HistoriaClinica(id_historia),
    enfermedades_importantes TEXT,
    cirugias_previas TEXT,
    hospitalizaciones TEXT,
    alergias TEXT,
    medicamentos_actuales TEXT,
    vacunacion_completa BOOLEAN,
    enf_musculoesqueleticas_familia TEXT,
    condiciones_hereditarias TEXT
);

-- Tabla: EvaluacionFuncional
CREATE TABLE EvaluacionFuncional (
    id_historia INTEGER PRIMARY KEY REFERENCES HistoriaClinica(id_historia),
    marcha_estado VARCHAR(20),
    marcha_descripcion TEXT,
    equilibrio_estado VARCHAR(20),
    rango_movimiento_estado VARCHAR(20),
    rango_movimiento_areas TEXT,
    fuerza_muscular_estado VARCHAR(20),
    fuerza_muscular_areas TEXT
);

-- Tabla: FuerzaMuscular
CREATE TABLE FuerzaMuscular (
    id_fuerza SERIAL PRIMARY KEY,
    id_historia INTEGER NOT NULL REFERENCES HistoriaClinica(id_historia),
    zona_anatomica VARCHAR(30) NOT NULL,
    grupo_muscular VARCHAR(100) NOT NULL,
    musculos VARCHAR(100) NOT NULL,
    grado SMALLINT NOT NULL CHECK (grado BETWEEN 0 AND 5)
);

-- Tabla: PruebasEspecificas
CREATE TABLE PruebasEspecificas (
    id_historia INTEGER PRIMARY KEY REFERENCES HistoriaClinica(id_historia),
    adams_test VARCHAR(10) NOT NULL,
    jack_test VARCHAR(10) NOT NULL,
    otras_pruebas TEXT
);

-- Tabla: FirmasConsentimientos
CREATE TABLE FirmasConsentimientos (
    id_historia INTEGER PRIMARY KEY REFERENCES HistoriaClinica(id_historia),
    nombre_evaluador VARCHAR(100),
    firma_evaluador TEXT,
    nombre_tutor VARCHAR(100),
    firma_tutor TEXT
);

-- Tabla: InformeFinal
CREATE TABLE InformeFinal (
    id_informe SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    tipo_informe VARCHAR(50) NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES Usuario(id_usuario),
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    enlace_pdf TEXT
);


-- ============================================================
--  [MOD] HistoriaClinica
--  + estado del caso (activo / alta / derivado / abandonó)
--  + fecha_alta y motivo_alta
--  + diagnostico_definitivo separado del preliminar
--  + medidas antropométricas adicionales (IMC, dismetría, ángulo de Cobb)
-- ============================================================
CREATE TABLE HistoriaClinica (
    id_historia SERIAL PRIMARY KEY,
    id_paciente INTEGER NOT NULL REFERENCES Paciente(id_paciente),
    id_estudiante INTEGER NOT NULL REFERENCES Usuario(id_usuario),

    -- Datos escolares y tutor
    edad INTEGER NOT NULL,
    escuela VARCHAR(50),
    grado VARCHAR(50),
    nombres_tutor VARCHAR(50),
    apellidos_tutor VARCHAR(50),
    telefono_tutor VARCHAR(20),
    correo_tutor VARCHAR(100),
    id_sector INTEGER REFERENCES Sector(id_sector),

    -- Medidas antropométricas [MOD: ampliadas]
    peso DECIMAL(5,2),
    estatura DECIMAL(5,2),
    imc DECIMAL(4,2),                          -- calculado en app; guardado para historial
    longitud_miembro_inferior_d DECIMAL(5,2),  -- cm, para detectar dismetrías
    longitud_miembro_inferior_i DECIMAL(5,2),
    angulo_cobb DECIMAL(4,1),                  -- grados, si aplica escoliosis

    -- Historia clínica
    fecha_evaluacion DATE NOT NULL,
    motivo_consulta TEXT,
    inicio_sintomas VARCHAR(10),
    descripcion_sintomas TEXT,
    factores_agran_o_alivian TEXT,
    tratamientos_previos TEXT,

    -- Diagnóstico [MOD: separado en preliminar y definitivo]
    diagnostico_preliminar TEXT,
    diagnostico_definitivo TEXT,               -- se completa tras evaluación completa
    clasificacion_cie10 VARCHAR(10),           -- ej. M21.4, Q66.5

    -- Plan de intervención
    objetivos_corto_plazo TEXT,
    objetivos_mediano_plazo TEXT,
    objetivos_largo_plazo TEXT,
    frecuencia_sesiones VARCHAR(50),           -- ej. "2 veces por semana"
    duracion_tratamiento VARCHAR(50),          -- ej. "3 meses"
    ejercicios_fortalecimiento TEXT,
    ejercicios_estiramiento TEXT,
    reeducacion_postural TEXT,
    otras_tecnicas TEXT,

    -- Recomendaciones
    uso_calzado_adecuado VARCHAR(4),
    especificar_calzado TEXT,
    actividades_fisicas TEXT,
    restricciones_precauciones TEXT,

    -- Estado del caso [NEW]
    estado VARCHAR(20) NOT NULL DEFAULT 'activo'
        CHECK (estado IN ('activo', 'alta', 'derivado', 'abandonó')),
    fecha_alta DATE,
    motivo_alta TEXT                           -- criterios de cierre o derivación
);


-- ============================================================
--  [MOD] EvaluacionPostural
--  + lateralidad explícita en hombros, pelvis y extremidades
--  + evaluación del calzado actual
-- ============================================================
CREATE TABLE EvaluacionPostural (
    id_historia INTEGER PRIMARY KEY REFERENCES HistoriaClinica(id_historia),

    -- Cabeza y columna (vista global)
    cabeza_cuello TEXT,
    columna VARCHAR(50),                       -- ej. 'cifosis leve', 'escoliosis funcional'

    -- Hombros [MOD: separados por lado]
    hombro_derecho VARCHAR(50),                -- ej. 'elevado', 'normal', 'descendido'
    hombro_izquierdo VARCHAR(50),

    -- Pelvis [MOD: separada por tipo de alteración]
    pelvis_inclinacion VARCHAR(30),            -- 'anterior', 'posterior', 'neutra'
    pelvis_rotacion VARCHAR(30),               -- 'derecha', 'izquierda', 'neutra'
    pelvis_oblicuidad VARCHAR(30),             -- 'elevada derecha', 'elevada izquierda', 'neutra'

    -- Extremidades inferiores [MOD: separadas por lado]
    rodilla_derecha VARCHAR(50),               -- ej. 'valgo', 'varo', 'normal'
    rodilla_izquierda VARCHAR(50),
    tobillo_derecho VARCHAR(50),               -- ej. 'valgo', 'varo', 'normal'
    tobillo_izquierdo VARCHAR(50),
    arco_plantar_derecho VARCHAR(50),          -- ej. 'plano', 'normal', 'cavo'
    arco_plantar_izquierdo VARCHAR(50),

    -- Evaluación del calzado actual [NEW]
    tipo_calzado_actual VARCHAR(50),
    talla_calzado VARCHAR(10),
    desgaste_calzado VARCHAR(50),              -- ej. 'lateral externo D', 'uniforme'

    -- Palpación
    puntos_dolorosos TEXT,
    eva_dolor SMALLINT CHECK (eva_dolor BETWEEN 0 AND 10),
    tejidos_blandos TEXT,
    estructuras_oseas TEXT
);


-- ============================================================
--  [MOD] Seguimiento
--  + métricas objetivas por sesión (EVA, asistencia, cumplimiento)
--  + re-evaluación funcional básica
-- ============================================================
CREATE TABLE Seguimiento (
    id_seguimiento SERIAL PRIMARY KEY,
    id_historia INTEGER NOT NULL REFERENCES HistoriaClinica(id_historia),
    id_estudiante INTEGER REFERENCES Usuario(id_usuario),
    fecha DATE NOT NULL,

    -- Registro de sesión
    asistio BOOLEAN NOT NULL DEFAULT TRUE,
    motivo_inasistencia TEXT,
    intervenciones TEXT,
    observaciones TEXT,

    -- Métricas de progreso [NEW]
    eva_dolor SMALLINT CHECK (eva_dolor BETWEEN 0 AND 10),
    cumplimiento_ejercicios VARCHAR(20)
        CHECK (cumplimiento_ejercicios IN ('total', 'parcial', 'nulo', 'no_aplica')),
    observacion_marcha VARCHAR(20)
        CHECK (observacion_marcha IN ('mejoró', 'igual', 'empeoró', 'no_evaluada')),
    observacion_postura VARCHAR(20)
        CHECK (observacion_postura IN ('mejoró', 'igual', 'empeoró', 'no_evaluada')),
    notas_progreso TEXT                        -- observación libre de evolución
);


-- ============================================================
--  [NEW] Goniometria
--  Rangos de movimiento articular por articulación, movimiento y lado.
--  Similar en estructura a FuerzaMuscular — permite comparar entre sesiones.
-- ============================================================
CREATE TABLE Goniometria (
    id_goniometria SERIAL PRIMARY KEY,
    id_historia INTEGER NOT NULL REFERENCES HistoriaClinica(id_historia),

    articulacion VARCHAR(50) NOT NULL,         -- ej. 'tobillo', 'rodilla', 'cadera'
    movimiento VARCHAR(50) NOT NULL,           -- ej. 'flexión', 'extensión', 'pronación'
    lado VARCHAR(10) NOT NULL
        CHECK (lado IN ('derecho', 'izquierdo', 'bilateral')),

    grados_activo DECIMAL(5,1),                -- rango activo del paciente
    grados_pasivo DECIMAL(5,1),                -- rango pasivo (examinador)
    valor_normal DECIMAL(5,1),                 -- referencia para comparación
    observaciones VARCHAR(200)
);


-- ============================================================
--  [NEW] Archivo
--  Imágenes y documentos clínicos asociados a la historia.
--  La URL apunta a almacenamiento externo (S3, bucket, etc.).
-- ============================================================
CREATE TABLE Archivo (
    id_archivo SERIAL PRIMARY KEY,
    id_historia INTEGER NOT NULL REFERENCES HistoriaClinica(id_historia),
    id_usuario INTEGER REFERENCES Usuario(id_usuario),   -- quién subió el archivo

    tipo VARCHAR(30) NOT NULL
        CHECK (tipo IN (
            'foto_postural_anterior',
            'foto_postural_posterior',
            'foto_postural_lateral',
            'podoscopia',
            'radiografia',
            'plantilla_pisada',
            'video_marcha',
            'otro'
        )),
    url TEXT NOT NULL,
    descripcion VARCHAR(200),
    fecha_subida TIMESTAMP DEFAULT NOW()
);


-- ============================================================
--  [NEW] SupervisionDocente
--  Permite al docente revisar, observar y aprobar las historias
--  clínicas elaboradas por los estudiantes.
-- ============================================================
CREATE TABLE SupervisionDocente (
    id_supervision SERIAL PRIMARY KEY,
    id_historia INTEGER NOT NULL REFERENCES HistoriaClinica(id_historia),
    id_docente INTEGER NOT NULL REFERENCES Usuario(id_usuario),

    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    estado VARCHAR(25) NOT NULL
        CHECK (estado IN ('pendiente', 'revisado', 'con_observaciones', 'aprobado')),

    -- Retroalimentación por sección
    observaciones_anamnesis TEXT,
    observaciones_evaluacion TEXT,
    observaciones_diagnostico TEXT,
    observaciones_plan TEXT,

    -- Calificación académica (opcional)
    calificacion DECIMAL(4,2),                 -- ej. 8.5 sobre 10
    comentario_general TEXT,

    fecha_aprobacion DATE                      -- se llena cuando estado = 'aprobado'
);


-- ============================================================
--  [NEW] Ortesis
--  Prescripción y seguimiento de plantillas u otros dispositivos ortésicos.
-- ============================================================
CREATE TABLE Ortesis (
    id_ortesis SERIAL PRIMARY KEY,
    id_historia INTEGER NOT NULL REFERENCES HistoriaClinica(id_historia),

    tipo VARCHAR(50) NOT NULL,                 -- ej. 'plantilla personalizada', 'cuña', 'tobillera'
    material VARCHAR(100),                     -- ej. 'EVA 40°', 'polipropileno'
    pie VARCHAR(15) NOT NULL
        CHECK (pie IN ('derecho', 'izquierdo', 'ambos')),

    fecha_prescripcion DATE NOT NULL,
    modificaciones TEXT,                       -- ajustes realizados en controles
    respuesta_paciente TEXT,                   -- tolerancia, adaptación
    estado VARCHAR(20) DEFAULT 'activo'
        CHECK (estado IN ('activo', 'reemplazado', 'suspendido'))
);
