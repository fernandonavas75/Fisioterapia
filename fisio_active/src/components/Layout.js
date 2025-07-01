import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  const usuario = localStorage.getItem('usuario');

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="col-md-10">
        <TopBar usuario={usuario} />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
