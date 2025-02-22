import React from "react";
function ConfirmDeleteCardPopup({ isOpen, onClose, onConfirmDelete }) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setIsDeleting(true);
    onConfirmDelete().finally(() => {
      setIsDeleting(false);
    });
  }
  return (
    <>
      <section
        className={`popup popup-delete-card ${isOpen ? "popup__opened" : " "}`}
      >
        <div className="popup__container">
          <button onClick={onClose} className="popup__close-button"></button>
          <h2 className="popup__heading">¿Estás seguro/a?</h2>
          <form
            onSubmit={handleSubmit}
            className={`popup__form popup__form-delete-card`}
            noValidate
          >
            <fieldset className="popup__form-set">
              <button
                type="submit"
                className={`popup__form-button popup__form-button_active popup__save-button-delete-card`}
              >
                {isDeleting ? "Borrando..." : "Confirmar"}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}

export default ConfirmDeleteCardPopup;
