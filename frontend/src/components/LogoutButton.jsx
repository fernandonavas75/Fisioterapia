// src/components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/", { replace: true });
  };

  return (
    <button onClick={handleLogout} style={{
      padding: "10px 20px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "1rem"
    }}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
