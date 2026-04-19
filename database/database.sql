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

-- Tabla: HistoriaClinica
CREATE TABLE HistoriaClinica (
    id_historia SERIAL PRIMARY KEY,
    id_paciente INTEGER NOT NULL REFERENCES Paciente(id_paciente),
    id_estudiante INTEGER NOT NULL REFERENCES Usuario(id_usuario),

    -- Datos clínicos del paciente
    edad INTEGER NOT NULL,
    peso DECIMAL(5,2),
    estatura DECIMAL(5,2),
    escuela VARCHAR(50),
    grado VARCHAR(50),
    nombres_tutor VARCHAR(50),
    apellidos_tutor VARCHAR(50),
    telefono_tutor VARCHAR(20),
    correo_tutor VARCHAR(100),
    id_sector INTEGER REFERENCES Sector(id_sector),

    -- Historia clínica
    fecha_evaluacion DATE NOT NULL,
    motivo_consulta TEXT,

    inicio_sintomas VARCHAR(10),
    descripcion_sintomas TEXT,
    factores_agran_o_alivian TEXT,
    tratamientos_previos TEXT,

    diagnostico_preliminar TEXT,

    -- Plan de intervención
    objetivos TEXT,
    ejercicios_fortalecimiento TEXT,
    ejercicios_estiramiento TEXT,
    reeducacion_postural TEXT,
    otras_tecnicas TEXT,

    -- Recomendaciones
    uso_calzado_adecuado VARCHAR(4),
    especificar_calzado TEXT,
    actividades_fisicas TEXT,
    restricciones_precauciones TEXT
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

-- Tabla: EvaluacionPostural
CREATE TABLE EvaluacionPostural (
    id_historia INTEGER PRIMARY KEY REFERENCES HistoriaClinica(id_historia),

    cabeza_cuello TEXT,
    hombros VARCHAR(20),
    columna VARCHAR(50),
    pelvis VARCHAR(20),
    extremidades_inferiores VARCHAR(50),
    arco_plantar VARCHAR(50),

    puntos_dolorosos TEXT,
    eva_dolor SMALLINT CHECK (eva_dolor BETWEEN 0 AND 10),
    tejidos_blandos TEXT,
    estructuras_oseas TEXT
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

-- Tabla: Seguimiento
CREATE TABLE Seguimiento (
    id_seguimiento SERIAL PRIMARY KEY,
    id_historia INTEGER NOT NULL REFERENCES HistoriaClinica(id_historia),
    id_estudiante INTEGER REFERENCES Usuario(id_usuario),
    fecha DATE NOT NULL,
    intervenciones TEXT,
    observaciones TEXT
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

-- Tabla: FirmasConsentimientos
CREATE TABLE FirmasConsentimientos (
    id_historia INTEGER PRIMARY KEY REFERENCES HistoriaClinica(id_historia),
    nombre_evaluador VARCHAR(100),
    firma_evaluador TEXT,
    nombre_tutor VARCHAR(100),
    firma_tutor TEXT
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