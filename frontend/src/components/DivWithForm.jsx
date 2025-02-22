import React from "react";
import {divConfig} from "../utils/constants";
import FormValidator from "./FormValidator";
import { Link, useLocation } from "react-router-dom";

function DivWithForm({
  name,
  title,
  message,
  isOpen,
  children,
  buttonText,
  onSubmit,
}) {
  //Form Validation
  const formRef = React.useRef();
  React.useEffect(() => {
    const formValidation = new FormValidator(divConfig, formRef.current);
    formValidation.enableValidation();
  }, []);
  React.useEffect(() => {
    if (!isOpen) {
      const formValidation = new FormValidator(divConfig, formRef.current);
      formValidation.resetValidation();
    }
  }, [isOpen]);

  //Location
  const location = useLocation();
  React.useEffect(() => {}, [location]);

  return (
    <>
      <section
        className={`div div-${name} ${isOpen ? "div__opened" : " "}`}
      >
        <div className="div__container">
          <h2 className="div__heading">{title}</h2>
          <form
            onSubmit={onSubmit}
            className={`div__form div__form-${name}`}
            noValidate
            ref={formRef}
          >
            <fieldset className="div__form-set">
              {children}
              <button
                type="submit"
                className={`div__form-button div__form-button_active div__save-button-${name}`}
              >
                {buttonText}
              </button>
            </fieldset>
          </form>
        {location.pathname == "/login" && (
          <Link to="/register" className="div__message">{`${message}`}</Link>
          )}
        {location.pathname == "/register" && (
          <Link to="/login" className="div__message">{`${message}`}</Link>
          )}
        </div>
      </section>
    </>
  );
}

export default DivWithForm;