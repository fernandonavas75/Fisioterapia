// src/pages/AdminDashboard.jsx
import LogoutButton from "../components/LogoutButton";

const AdminDashboard = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Bienvenido, {usuario?.nombre_completo || "Administrador"}</h2>
      <p>Rol: {usuario?.rol}</p>

      {/* Aquí irán las funciones del admin */}
      <LogoutButton />
    </div>
  );
};

export default AdminDashboard;
