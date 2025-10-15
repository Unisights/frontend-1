import {Navigate} from 'react-router-dom';
export default function PrivateRoute({children, roles}){
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');
  if(!token || (roles && !roles.includes(role))) return <Navigate to="/" />;
  return children;
}