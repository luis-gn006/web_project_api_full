import React from "react";
import {formConfig} from "../utils/constants";
import FormValidator from "./FormValidator";
function PopupWithForm({
  name,
  title,
  isOpen,
  children,
  buttonText,
  onClose,
  onSubmit,
}) {
  //Form Validation
  const formRef = React.useRef();
  React.useEffect(() => {
    const formValidation = new FormValidator(formConfig, formRef.current);
    formValidation.enableValidation();
  }, []);
  React.useEffect(() => {
    if (!isOpen) {
      const formValidation = new FormValidator(formConfig, formRef.current);
      formValidation.resetValidation();
    }
  }, [isOpen]);

  return (
    <>
      <section
        className={`popup popup-${name} ${isOpen ? "popup__opened" : " "}`}
      >
        <div className="popup__container">
          <button onClick={onClose} className="popup__close-button"></button>
          <h2 className="popup__heading">{title}</h2>
          <form
            onSubmit={onSubmit}
            className={`popup__form popup__form-${name}`}
            noValidate
            ref={formRef}
          >
            <fieldset className="popup__form-set">
              {children}
              <button
                type="submit"
                className={`popup__form-button popup__form-button_active popup__save-button-${name}`}
              >
                {buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}

export default PopupWithForm;
