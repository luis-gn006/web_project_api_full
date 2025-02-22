import React from "react";
import DivWithForm from "./DivWithForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useEffect } from "react";

function Register({ isOpen, onRegistration }) {
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
    onRegistration({
      email,
      password,
    }).finally(() => {
      setIsPatching(false);
    });
  }

  return (
    <>
      <DivWithForm
        name={"register"}
        title={"Registrate"}
        message={'¿Ya eres miembro? Inicia sesión aquí'}
        isOpen={isOpen}
        buttonText={isPatching ? "Registrando..." : "Registrate"}
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

export default Register;