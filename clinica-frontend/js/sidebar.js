function showSidebar(section) {
  const sidebar = document.getElementById("sidebar");
  if (section === "gestion") {
    sidebar.innerHTML = `
      <ul>
        <li><a href="#" onclick="loadContent('gestion_pacientes.html')">Gestión de Pacientes</a></li>
        <li><a href="#" onclick="loadContent('gestion_medicos.html')">Gestión de Médicos</a></li>
      </ul>
    `;
  } else if (section === "reportes") {
    sidebar.innerHTML = `
      <ul>
        <li><a href="#" onclick="loadContent('historial_paciente.html')">Historial del Paciente</a></li>
      </ul>
    `;
  }
}
