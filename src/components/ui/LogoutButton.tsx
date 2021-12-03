import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  }
  return (
    <button 
    className="btn max-width btn-danger"
    onClick={handleLogout}
    >
      Cerrar Sesión
    </button>
  )
}

export default LogoutButton
