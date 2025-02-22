import logo from "../images/header__logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Header({handleLogout, email, }) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();


  React.useEffect(() => {}, [location]);
  return (
    <>
      <header className="header">
        <div className="header__container">
        <img src={logo} alt="logo Arround the US" className="header__logo" />
        <p className="header__user-email"> {currentUser ? email : ""}</p>
        {location.pathname == "/login" && (
          <Link to="/register" className="header__register-login-link">Registrate</Link>
        )}
        {location.pathname == "/register" && (
          <Link to="/login" className="header__register-login-link">Iniciar sesión</Link>
        )}
        {email && (
          <a className="header__close-sesion" onClick={handleLogout}>
            Cerrar sesión
          </a>
        )}
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
}

export default Header;
