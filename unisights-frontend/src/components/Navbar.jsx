export default function Navbar(){
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Unisights</span>
      <button className="btn btn-outline-light btn-sm"
        onClick={()=>{ localStorage.clear(); location.href='/'; }}>
        Logout
      </button>
    </nav>
  );
}