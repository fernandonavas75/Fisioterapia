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



**Mejoras Actuales**

# 🧠 Proyecto Fisioterapia - Sistema de Autenticación

Este proyecto implementa un sistema completo de autenticación de usuarios con backend en **Node.js**, base de datos **PostgreSQL**, y frontend en **React.js**. La interfaz fue diseñada con un estilo moderno inspirado en la PUCE.

---

## 📁 Estructura General

backend-fisio/
├── models/
├── routes/
├── controllers/
├── config/
├── index.js
├── .env
└── ...
frontend/
├── src/
│ ├── components/
│ │ └── LoginForm.jsx
│ │ └── LoginForm.module.css
│ ├── App.jsx
│ └── main.jsx
└── ...


---

## 🔐 Backend - Autenticación

### Tecnologías:

- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT (token de sesión)
- bcryptjs (encriptación de contraseñas)
- dotenv para variables de entorno

### Endpoints disponibles:

| Método | Ruta                  | Descripción                      |
|--------|-----------------------|----------------------------------|
| POST   | `/api/auth/register`  | Registro de nuevo usuario        |
| POST   | `/api/auth/login`     | Login de usuario con JWT         |

### Cambios importantes:

- Se agregó protección con **bcryptjs** para las contraseñas.
- Se generó el `JWT_SECRET` en el archivo `.env`.
- Se agregó middleware `auth.routes.js` para manejar login y registro.
- Se incluyó `cors()` para permitir conexiones frontend-backend.
- Se corrigieron errores de rutas y se probó exitosamente con **Postman**.

---

## 💻 Frontend - React

### Tecnologías:

- React con Vite
- CSS Modules para estilos locales
- Axios para peticiones HTTP

### Mejoras implementadas:

- 🧾 **Formulario de login funcional** conectado con el backend.
- 🎨 Diseño **moderno, centrado, responsive**.
- 👁️ Botón para **mostrar/ocultar contraseña**.
- ✅ Validación de campos requeridos.
- 📦 Gestión de `localStorage` para guardar el token y usuario.

### Estilos:

- Se diseñó una UI personalizada inspirada en **colores institucionales**.
- Los elementos están **centrados vertical y horizontalmente** en todos los dispositivos.
- Se descartó el uso de Tailwind CSS por simplicidad.

---

## ⚙️ Variables de entorno (.env)

```env
PORT=3000
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=12345
JWT_EXPIRES_IN=1d

 Futuras mejoras

Validaciones con Joi o express-validator

Paginación y filtrado de registros

Documentación con Swagger

Tests unitarios

Próximos pasos
Implementar rutas protegidas según el rol del usuario.

Crear los dashboards para admin y estudiante.

Incluir más formularios del sistema clínico (historial, evaluaciones, etc.).

📌 Recomendaciones
Usar npm run dev en ambos proyectos para desarrollo local.

Asegúrate de que el backend esté corriendo antes de intentar loguearte.

Verifica que el frontend esté enviando correctamente las peticiones (proxy o CORS).


## 📌 Patch Notes

### 🗓️ 22 de junio de 2025

#### 🔐 Login de Usuarios
- Se implementó un formulario de login con diseño moderno, responsivo y validación de campos.
- Se agregó el manejo de errores para credenciales inválidas.
- Se integró el consumo del endpoint `/api/auth/login`.
- Se almacena el token JWT en localStorage.
- Se redirige al dashboard correspondiente según el rol del usuario (`admin` o `estudiante`).

#### 🧠 Rutas Protegidas
- Se implementó un componente `ProtectedRoute` para evitar el acceso a vistas sin autenticación.
- Redirecciona a la pantalla de login si no se encuentra un token válido.

#### 🧑‍🎓 Dashboard Estudiantes
- Se adaptó una interfaz HTML clásica a React para visualizar historias clínicas.
- Se utilizó Bootstrap para el diseño visual del panel.
- Se muestra el nombre real del estudiante según el login.
- Se agregó botón de cerrar sesión con limpieza del token y redirección segura.

#### 📁 Organización de Archivos
- Estructura clara de carpetas (`components`, `pages`, `api`).
- Separación de vistas de login, dashboards y formularios.

#### 🧪 Dependencias Nuevas
- Bootstrap (`npm install bootstrap`)
- Axios para llamadas HTTP

---

> ✅ Próximos pasos:
- Integrar formulario completo de historia clínica con conexión al backend.
- Implementar vista para registrar nuevos pacientes.
- Conectar con módulos como antecedentes, pruebas y firmas.


v1.0.0 - 23 de junio 2025
[✔] Login funcional con validación de rol

[✔] Redirección automática post-login

[✔] Sidebar dinámico según el rol

[✔] CRUD completo de historias clínicas

[✔] Reportes visuales con Chart.js

[✔] Módulo de diagnóstico por IA con integración OpenAI

[✔] Rutas protegidas con JWT

[✔] Responsive UI básica con Bootstrap
backend 

cd backend-fisio
npm install
# Crear .env con:
# OPENAI_API_KEY=tu_clave
# DB configs
npm run dev
