import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsPosting(true);
    onAddPlace({
      name: title,
      url: link,
    }).finally(() => {
      setIsPosting(false);
    });
  }
  React.useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setLink("");
    }
  }, [isOpen]);
  return (
    <>
      <PopupWithForm
        name={"elements"}
        title={"Nuevo lugar"}
        isOpen={isOpen}
        buttonText={isPosting ? "Creando..." : "Crear"}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="popup__form-label"></label>
        <input
          type="text"
          className="popup__form-input popup__form-title"
          id="title"
          name="title"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChangeTitle}
          value={title}
        />
        <div className="popup__line"></div>
        <span className="popup__input-error title-error"></span>
        <label htmlFor="link__image" className="popup__form-label"></label>
        <input
          type="url"
          className="popup__form-input popup__form-link"
          id="linkimage"
          name="link"
          placeholder="Enlace a la imagen"
          required
          onChange={handleChangeLink}
          value={link}
        />
        <div className="popup__line"></div>
        <span className="popup__input-error linkimage-error"></span>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
