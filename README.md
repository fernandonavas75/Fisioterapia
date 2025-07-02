# 🏥 FISIOTERAPIA BACKEND

*Transforming Care Through Seamless Clinical Innovation*

![last commit](https://img.shields.io/github/last-commit/tu_usuario/tu_repositorio)
![javascript](https://img.shields.io/badge/javascript-97%25-yellow)
![languages](https://img.shields.io/github/languages/count/tu_usuario/tu_repositorio)

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


MIT © Fernando Navas @LuisSalazar
