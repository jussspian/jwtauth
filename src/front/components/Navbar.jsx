import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(!!sessionStorage.getItem("token"));

  useEffect(() => {
    setAuthed(!!sessionStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setAuthed(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        <div className="ml-auto d-flex gap-2">
          {authed ? (
            <>
              <Link to="/private">
                <button className="btn btn-outline-primary">Private</button>
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline-secondary">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};