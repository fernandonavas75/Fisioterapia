import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const CoordDashboard = () => {
  return (
    <div className="main">
      <div className="d-flex justify-content-between mb-3">
        <input className="form-control w-50" placeholder="Buscar paciente por nombre..." />
        <button className="btn btn-success ms-3">+ Nueva Historia Clínica</button>
      </div>

      <p className="text-muted">No se encontraron pacientes.</p>
    </div>
  );
};

export default CoordDashboard;

