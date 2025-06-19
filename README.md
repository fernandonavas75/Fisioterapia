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
- **JWT_SECRET=clave_super_segura**
- **JWT_EXPIRES_IN=1d**

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



Autenticación con JWT

---

##  Autenticación y autorización

Este backend utiliza **JWT (JSON Web Tokens)** para gestionar sesiones de usuario y proteger rutas.

### 📌 Endpoints de autenticación

- `POST /api/auth/login` – Recibe `{ correo, contrasena }` y devuelve un `token` JWT y datos del usuario.

###  Middleware `verifyToken`

Protege rutas asegurándose de que el usuario esté autenticado. Se debe enviar el token en el header:


### 🧑‍💼 Middleware `verifyRole`

Permite limitar el acceso a ciertos roles (`admin`, `estudiante`, etc.). Se usa junto con `verifyToken`.

### 📌 Ejemplo de uso en rutas:

```js
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');

router.get('/', verifyToken, controller.obtenerTodos); // Solo usuarios logueados
router.post('/', verifyToken, verifyRole(['admin']), controller.crear); // Solo admin

 Futuras mejoras

Validaciones con Joi o express-validator

Paginación y filtrado de registros

Documentación con Swagger

Tests unitarios
