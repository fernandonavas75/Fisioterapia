const TopBar = ({ usuario }) => {
  return (
    <header className="top-bar d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white shadow-sm">
      <h5 className="m-0 fw-semibold text-primary">Panel de Historias Clínicas</h5>
      <span className="text-muted small">Usuario: {usuario || 'Invitado'}</span>
    </header>
  );
};

export default TopBar;
