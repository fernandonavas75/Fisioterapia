import LoginForm from '../components/LoginForm/LoginForm';
import '../components/LoginForm/LoginForm.module.css'
function LoginPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
