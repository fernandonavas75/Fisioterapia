import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm'; // ajusta el path si está en otra carpeta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* luego agregas más rutas como dashboard aquí */}
      </Routes>
    </Router>
  );
}

export default App;
