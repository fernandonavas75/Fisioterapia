import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Reportes = () => {
  useEffect(() => {
    // Pacientes por mes
    new Chart(document.getElementById('pacientesMes'), {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Pacientes atendidos',
          data: [12, 19, 7, 14, 20],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });

    // Género
    new Chart(document.getElementById('generoChart'), {
      type: 'doughnut',
      data: {
        labels: ['Masculino', 'Femenino'],
        datasets: [{
          data: [55, 45],
          backgroundColor: ['#36A2EB', '#FF6384']
        }]
      }
    });

    // Diagnóstico
    new Chart(document.getElementById('diagnosticoChart'), {
      type: 'pie',
      data: {
        labels: ['Escoliosis', 'Pie plano', 'Lordosis', 'Cifosis'],
        datasets: [{
          data: [30, 25, 20, 10],
          backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4BC0C0']
        }]
      }
    });

    // Ejercicios
    new Chart(document.getElementById('ejerciciosChart'), {
      type: 'bar',
      data: {
        labels: ['Estiramiento', 'Fortalecimiento', 'Posturales', 'Respiración'],
        datasets: [{
          data: [15, 25, 10, 5],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center" id="titReports">Reportes de Atención Fisioterapéutica</h2>

      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <div className="p-3 bg-white shadow rounded">
            <h6 className="text-center">Pacientes Atendidos por Mes</h6>
            <canvas id="pacientesMes"></canvas>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="p-3 bg-white shadow rounded">
            <h6 className="text-center">Distribución por Género</h6>
            <canvas id="generoChart"></canvas>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="p-3 bg-white shadow rounded">
            <h6 className="text-center">Tipos de Diagnóstico</h6>
            <canvas id="diagnosticoChart"></canvas>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="p-3 bg-white shadow rounded">
            <h6 className="text-center">Tipos de Ejercicios Aplicados</h6>
            <canvas id="ejerciciosChart"></canvas>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded mt-4">
        <h5>Últimos Reportes Generados</h5>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Paciente</th>
              <th>Diagnóstico</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-06-01</td>
              <td>Juan Pérez</td>
              <td>Escoliosis leve</td>
              <td>Prof. Ramírez</td>
            </tr>
            <tr>
              <td>2025-05-28</td>
              <td>Lucía Morales</td>
              <td>Pie plano</td>
              <td>Prof. Herrera</td>
            </tr>
            <tr>
              <td>2025-05-25</td>
              <td>Andrés Castillo</td>
              <td>Lordosis lumbar</td>
              <td>Prof. Ramírez</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reportes;

