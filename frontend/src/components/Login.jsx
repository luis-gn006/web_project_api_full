import React from "react";
import DivWithForm from "./DivWithForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Login({ isOpen, onLogin }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPatching, setIsPatching] = React.useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setEmail(/*currentUser.name ||*/ "");
      setPassword(/*currentUser.about ||*/ "");
    }
  }, [currentUser]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsPatching(true);
    onLogin({
      email,
      password,
    }).finally(() => {
      setIsPatching(false);
    });
  }
  React.useEffect(() => {
    if (!isOpen) {
      if (currentUser) {
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
      }
    }
  }, [isOpen]);
  return (
    <>
      <DivWithForm
        name={"login"}
        title={"Inicia sesión"}
        message={'¿Aún no eres miembro? Regístrate aquí'}
        isOpen={isOpen}
        buttonText={isPatching ? "Iniciando sesión..." : "Inicia sesión"}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="div__form-label"></label>
        <input
          type="email"
          className="div__form-input div__form-email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeEmail}
          value={email}
        />
        <div className="div__line div__line-email"></div>
        <span className="div__input-error email-error"></span>
        <label htmlFor="password" className="div__form-label"></label>
        <input
          type="password"
          className="div__form-input div__form-password"
          id="password"
          name="password"
          placeholder="Contraseña"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangePassword}
          value={password}
        />
        <div className="div__line div__line-password"></div>
        <span className="div__input-error password-error"></span>
      </DivWithForm>
    </>
  );
}

export default Login;
