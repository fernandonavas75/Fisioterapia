# Fisioterapia
 Trabajo Chugchilan
# Backend Fisioterapia - Historia Clínica

Este proyecto es un backend desarrollado con **Node.js**, **Express**, **Sequelize** y **PostgreSQL**, diseñado para gestionar información clínica de pacientes, evaluaciones y seguimientos médicos.

---

##  Tecnologías utilizadas

- **Node.js** + **Express.js**
- **Sequelize** (ORM)
- **PostgreSQL** (Base de Datos relacional)
- **dotenv** (Variables de entorno)
- Arquitectura por módulos: `models`, `routes`, `controllers`, `services`, `config`

---

##  Estructura del proyecto

backend-fisio/
├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── .env
├── index.js
└── README.md

---

## ⚙️ Configuración inicial

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=fisioterapia_db
DB_PORT=5432
PORT=3000
npm run dev

| Entidad                | Ruta Base                  | Relación Principal       |
| ---------------------- | -------------------------- | ------------------------ |
| Usuario                | `/api/usuarios`            | -                        |
| Paciente               | `/api/pacientes`           | -                        |
| Historia Clínica       | `/api/historias`           | Paciente, Usuario        |
| Antecedentes           | `/api/antecedentes`        | 1:1 con Historia Clínica |
| Evaluación Postural    | `/api/evaluacion-postural` | 1:1 con Historia Clínica |
| Fuerza Muscular        | `/api/fuerza-muscular`     | N:1 con Historia Clínica |
| Pruebas Específicas    | `/api/pruebas-especificas` | 1:1 con Historia Clínica |
| Seguimiento            | `/api/seguimientos`        | N:1 con Historia Clínica |
| Informe Final          | `/api/informes-finales`    | 1:1 con Historia Clínica |
| Firmas Consentimientos | `/api/firmas`              | 1:1 con Historia Clínica |

-- **Endpoints REST
Cada módulo tiene su CRUD:

GET /api/<modulo>

POST /api/<modulo>

PUT /api/<modulo>/:id

DELETE /api/<modulo>/:id


 Futuras mejoras
Autenticación con JWT

Validaciones con Joi o express-validator

Paginación y filtrado de registros

Documentación con Swagger

Tests unitarios
