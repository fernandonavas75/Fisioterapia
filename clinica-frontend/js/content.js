function loadContent(page) {
  fetch(`pages/${page}`)
    .then(response => response.text())
    .then(html => {
      document.getElementById("main-content").innerHTML = html;
    })
    .catch(err => {
      document.getElementById("main-content").innerHTML = "<p>Error al cargar la página.</p>";
    });
}
/**************gESTION DE PACIENTES JS********************/
let pacientes = [];

if (window.location.href.includes("gestion_pacientes.html")) {
  buscarPaciente();
}

function buscarPaciente() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const container = document.getElementById("pacientes-container");

  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  const resultados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(query)
  );

  if (resultados.length === 0) {
    container.innerHTML = "<p>No se encontraron pacientes.</p>";
  } else {
    container.innerHTML = `
      <ul>
        ${resultados
          .map((p, index) => `
            <li>
              <strong>${p.nombre}</strong> - ${p.edad} años - ${p.telefono}
              <br><em>${p.escuela} - ${p.grado}</em>
              <br>
              <button onclick="editarPaciente(${index})">✏️ Editar</button>
              <button onclick="eliminarPaciente(${index})">🗑️ Eliminar</button>
            </li>
          `)
          .join("")}
      </ul>
    `;
  }
}



function mostrarFormulario() {
  document.getElementById("formularioPaciente").style.display = "block";
}

function guardarPaciente(event) {
  event.preventDefault();
  const index = document.getElementById("formularioPaciente").dataset.editIndex;
  const paciente = {
    // todos los campos...
  };

  let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  if (index) {
    // Modo edición
    pacientes[parseInt(index)] = paciente;
    delete document.getElementById("formularioPaciente").dataset.editIndex;
  } else {
    // Modo nuevo
    pacientes.push(paciente);
  }

  localStorage.setItem("pacientes", JSON.stringify(pacientes));
  event.target.reset();
  document.getElementById("formularioPaciente").style.display = "none";
  buscarPaciente();
}

function eliminarPaciente(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    pacientes.splice(index, 1);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    buscarPaciente();
  }
}
function editarPaciente(index) {
  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  const p = pacientes[index];

  document.getElementById("formularioPaciente").style.display = "block";

  document.getElementById("nombre").value = p.nombre;
  document.getElementById("edad").value = p.edad;
  document.querySelector(`input[name="genero"][value="${p.genero}"]`).checked = true;
  document.getElementById("peso").value = p.peso;
  document.getElementById("estatura").value = p.estatura;
  document.getElementById("fechaNacimiento").value = p.fechaNacimiento;
  document.getElementById("fechaEvaluacion").value = p.fechaEvaluacion;
  document.getElementById("escuela").value = p.escuela;
  document.getElementById("grado").value = p.grado;
  document.getElementById("tutor").value = p.tutor;
  document.getElementById("telefono").value = p.telefono;
  document.getElementById("correo").value = p.correo;

  document.getElementById("enfermedades").value = p.enfermedades;
  document.getElementById("cirugias").value = p.cirugias;
  document.getElementById("hospitalizaciones").value = p.hospitalizaciones;
  document.getElementById("alergias").value = p.alergias;
  document.getElementById("medicamentos").value = p.medicamentos;
  document.querySelector(`input[name="vacunas"][value="${p.vacunas}"]`).checked = true;

  // Guardar el índice para actualizar en vez de crear nuevo
  document.getElementById("formularioPaciente").dataset.editIndex = index;
}
