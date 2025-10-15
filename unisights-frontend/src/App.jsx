import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Student from './pages/Student.jsx';
import Consultant from './pages/Consultant.jsx';
import Admin from './pages/Admin.jsx';

export default function App(){
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
           <Route path="/student" element={token ? <Student/> : <Navigate to="/" />}/>
           <Route path="/consultant" element={token ? <Consultant/> : <Navigate to="/" />}/>
           <Route path="/admin" element={token ? <Admin/> : <Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}