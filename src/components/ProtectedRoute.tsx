import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../reducers';

const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state: State) => state.owner);
  
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;
