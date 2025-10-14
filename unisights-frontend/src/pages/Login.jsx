import {useState} from 'react';
import api from '../api/axiosClient';
export default function Login(){
  const [email,setEmail] = useState(''); const [password,setPassword] = useState('');
  const submit = async e => {
    e.preventDefault();
    try{
      const r = await api.post('/auth/login',{email,password});
      localStorage.setItem('token', r.data.token);
      localStorage.setItem('role', r.data.role);
      if(r.data.role==='STUDENT') location.href='/student';
      else if(r.data.role==='CONSULTANT') location.href='/consultant';
      else location.href='/admin';
    }catch{ alert('Invalid credentials'); }
  };
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <form onSubmit={submit} className="card p-4 shadow" style={{width:340}}>
        <h4 className="mb-3">Login</h4>
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="form-control mb-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}