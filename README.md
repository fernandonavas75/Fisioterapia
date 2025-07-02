# 🏥 FISIOTERAPIA BACKEND

*Transforming Care Through Seamless Clinical Innovation*

![last commit](https://img.shields.io/github/last-commit/fernandonavas75/Fisioterapia)
![javascript](https://img.shields.io/badge/javascript-97%25-yellow)
![languages](https://img.shields.io/github/languages/count/fernandonavas75/Fisioterapia)

Built with the tools and technologies:

![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-black?logo=JSON%20web%20tokens)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js)
![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?logo=dotenv)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Available Modules](#available-modules)
- [Usage Examples](#usage-examples)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## 🩺 Overview

**Fisioterapia** is a robust backend infrastructure for managing patient clinical data, evaluations, and follow-ups in healthcare environments. It’s designed for seamless integration with a React frontend, offering a modern, secure, and scalable solution for clinical information systems.

---

## ✨ Features

✅ **Authentication & Security**  
- JWT-based authentication  
- Role-based access control (admin / estudiante)

✅ **CRUD Operations**  
- Complete Create, Read, Update, Delete for each module

✅ **Seamless Integration**  
- Easily connectable to a frontend built in React or any SPA

✅ **Modular Architecture**  
- Clearly organized routes, controllers, and models

✅ **Developer Friendly**  
- Clean Sequelize models and routes  
- Seed scripts to populate initial data

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- PostgreSQL
- npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
npm install

Start the development server:

node scripts/seed-final.js

Each module has its own set of protected CRUD routes:

| Module                  | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| **Usuarios**            | Authentication, login, user management               |
| **Pacientes**           | Patient personal data                                |
| **Sectores**            | Clinical sectors (e.g., Pediatrics, Sports)          |
| **Historia Clínica**    | Full patient clinical records and follow-ups         |
| **Antecedentes**        | Medical background info (allergies, surgeries, etc.) |
| **Evaluación Postural** | Posture assessment details                           |
| **Fuerza Muscular**     | Muscle strength evaluations                          |
| **Pruebas Específicas** | Specific physiotherapy tests and results             |
| **Seguimientos**        | Patient progress tracking over time                  |

Environment Variables

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=fisio
DB_PORT=5432
JWT_SECRET=supersecreto
PORT=3000

## **Rutas** 

API ROUTES - BACKEND FISIOTERAPIA
1. Auth / Usuarios
Método	Endpoint	Descripción
POST	/api/usuarios/login	Login de usuario (devuelve token)
POST	/api/usuarios/logout	Logout (opcional)
POST	/api/usuarios/refresh-token	Refresh token (opcional)
POST	/api/usuarios/	Crear usuario (protegido)
GET	/api/usuarios/	Obtener todos los usuarios (protegido)
GET	/api/usuarios/:id	Obtener usuario por ID (protegido)
PUT	/api/usuarios/:id	Actualizar usuario por ID (protegido)
DELETE	/api/usuarios/:id	Eliminar usuario por ID (protegido)
GET	/api/usuarios/correo/:correo	Buscar usuario por correo (protegido)
GET	/api/usuarios/cedula/:cedula	Buscar usuario por cédula (protegido)
GET	/api/usuarios/nombre/:nombre	Buscar usuario por nombre o apellido (protegido)

2. Pacientes
Método	Endpoint	Descripción
POST	/api/pacientes/	Crear paciente (protegido)
GET	/api/pacientes/	Obtener todos los pacientes (protegido)
GET	/api/pacientes/:id	Obtener paciente por ID (protegido)
PUT	/api/pacientes/:id	Actualizar paciente por ID (protegido)
DELETE	/api/pacientes/:id	Eliminar paciente por ID (protegido)
GET	/api/pacientes/nombre/:nombre	Buscar paciente por nombre o apellido (protegido)

3. Historia Clínica
Método	Endpoint	Descripción
POST	/api/historias-clinicas/	Crear historia clínica (protegido)
GET	/api/historias-clinicas/	Obtener todas las historias clínicas (protegido)
GET	/api/historias-clinicas/:id	Obtener historia clínica por ID (protegido)
PUT	/api/historias-clinicas/:id	Actualizar historia clínica (protegido)
DELETE	/api/historias-clinicas/:id	Eliminar historia clínica (protegido)
GET	/api/historias-clinicas/paciente/:id_paciente	Historias clínicas por paciente (protegido)
GET	/api/historias-clinicas/estudiante/:id_estudiante	Historias clínicas por estudiante (protegido)
GET	/api/historias-clinicas/sector/:id_sector	Historias clínicas por sector (protegido)
GET	/api/historias-clinicas/rango-fechas?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD	Historias clínicas por rango de fechas (protegido)

4. Antecedentes
Método	Endpoint	Descripción
POST	/api/antecedentes/	Crear antecedentes (protegido)
GET	/api/antecedentes/	Obtener todos los antecedentes (protegido)
GET	/api/antecedentes/:id_historia	Obtener antecedentes por ID de historia clínica (protegido)
PUT	/api/antecedentes/:id_historia	Actualizar antecedentes (protegido)
DELETE	/api/antecedentes/:id_historia	Eliminar antecedentes (protegido)

5. Evaluación Postural
Método	Endpoint	Descripción
POST	/api/evaluacion-postural/	Crear evaluación postural (protegido)
GET	/api/evaluacion-postural/	Obtener todas las evaluaciones (protegido)
GET	/api/evaluacion-postural/:id_historia	Obtener evaluación por ID historia clínica (protegido)
PUT	/api/evaluacion-postural/:id_historia	Actualizar evaluación (protegido)
DELETE	/api/evaluacion-postural/:id_historia	Eliminar evaluación (protegido)

6. Evaluación Funcional
Método	Endpoint	Descripción
POST	/api/evaluacion-funcional/	Crear evaluación funcional (protegido)
GET	/api/evaluacion-funcional/	Obtener todas las evaluaciones (protegido)
GET	/api/evaluacion-funcional/:id_historia	Obtener evaluación por ID historia clínica (protegido)
PUT	/api/evaluacion-funcional/:id_historia	Actualizar evaluación (protegido)
DELETE	/api/evaluacion-funcional/:id_historia	Eliminar evaluación (protegido)

7. Fuerza Muscular
Método	Endpoint	Descripción
POST	/api/fuerza-muscular/	Crear fuerza muscular (protegido)
GET	/api/fuerza-muscular/	Obtener todas las evaluaciones (protegido)
GET	/api/fuerza-muscular/:id_fuerza	Obtener fuerza muscular por ID (protegido)
PUT	/api/fuerza-muscular/:id_fuerza	Actualizar fuerza muscular (protegido)
DELETE	/api/fuerza-muscular/:id_fuerza	Eliminar fuerza muscular (protegido)

8. Pruebas Específicas
Método	Endpoint	Descripción
POST	/api/pruebas-especificas/	Crear prueba específica (protegido)
GET	/api/pruebas-especificas/	Obtener todas las pruebas (protegido)
GET	/api/pruebas-especificas/:id_historia	Obtener prueba por ID historia clínica (protegido)
PUT	/api/pruebas-especificas/:id_historia	Actualizar prueba específica (protegido)
DELETE	/api/pruebas-especificas/:id_historia	Eliminar prueba específica (protegido)

9. Seguimiento
Método	Endpoint	Descripción
POST	/api/seguimientos/	Crear seguimiento (protegido)
GET	/api/seguimientos/	Obtener todos los seguimientos (protegido)
GET	/api/seguimientos/:id_seguimiento	Obtener seguimiento por ID (protegido)
PUT	/api/seguimientos/:id_seguimiento	Actualizar seguimiento (protegido)
DELETE	/api/seguimientos/:id_seguimiento	Eliminar seguimiento (protegido)

10. Informe Final
Método	Endpoint	Descripción
POST	/api/informes-finales/	Crear informe final (protegido)
GET	/api/informes-finales/	Obtener todos los informes (protegido)
GET	/api/informes-finales/:id_informe	Obtener informe por ID (protegido)
PUT	/api/informes-finales/:id_informe	Actualizar informe final (protegido)
DELETE	/api/informes-finales/:id_informe	Eliminar informe final (protegido)

11. Firmas y Consentimientos
Método	Endpoint	Descripción
POST	/api/firmas-consentimientos/	Crear firma/consentimiento (protegido)
GET	/api/firmas-consentimientos/	Obtener todos (protegido)
GET	/api/firmas-consentimientos/:id_historia	Obtener por ID historia clínica (protegido)
PUT	/api/firmas-consentimientos/:id_historia	Actualizar firma/consentimiento (protegido)
DELETE	/api/firmas-consentimientos/:id_historia	Eliminar firma/consentimiento (protegido)

12. Sectores
Método	Endpoint	Descripción
POST	/api/sectores/	Crear sector (protegido)
GET	/api/sectores/	Obtener todos los sectores (protegido)
GET	/api/sectores/:id	Obtener sector por ID (protegido)
PUT	/api/sectores/:id	Actualizar sector (protegido)
DELETE	/api/sectores/:id	Eliminar sector (protegido)
GET	/api/sectores/buscar/nombre/:nombre	Buscar sector por nombre (protegido)

MIT © Fernando Navas @LuisSalazar
