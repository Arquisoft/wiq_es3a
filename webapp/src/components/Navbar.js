import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
 return (
   <header className="header">
     <nav className="nav container">

       <div
         className={"nav-menu"}
         id="nav-menu"
       >
         <ul className="nav-list">
            <li className="nav-item">
             <NavLink to="/user" className="nav__link">
               Usuario
             </NavLink>
            </li>

           <li className="nav-item">
             <NavLink to={process.env.RUTA_HOME || '/home'}  className="nav__link">
               Home
             </NavLink>
           </li>
           
           <li className="nav-item">
             <NavLink to={process.env.RUTA_INICIO || '/'} className="nav__link">
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