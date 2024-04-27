import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./login/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const { nombreUsuario } = useAuth();

  return (
    <header className="header">
      <nav className="nav container-fluid"> {/* Utiliza container-fluid para que ocupe todo el ancho */}

        <div className={"nav-menu"} id="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to={process.env.RUTA_RANKING || "/ranking"} className="nav__link">
                Ranking
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={process.env.RUTA_USER || "/statistics"} className="nav__link">
                Usuario {nombreUsuario}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={process.env.RUTA_HOME || '/home'} className="nav__link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={process.env.RUTA_LOGIN || '/login'} className="nav__link">
                Login
              </NavLink>
            </li>

          </ul>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
