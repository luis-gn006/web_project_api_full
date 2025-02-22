import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPatching, setIsPatching] = React.useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsPatching(true);
    onUpdateUser({
      name,
      about: description,
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
      <PopupWithForm
        name={"profile"}
        title={"Editar Perfil"}
        isOpen={isOpen}
        buttonText={isPatching ? "Guardando..." : "Guardar"}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="popup__form-label"></label>
        <input
          type="text"
          className="popup__form-input popup__form-name"
          id="name"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          value={name}
        />
        <div className="popup__line popup__line-name"></div>
        <span className="popup__input-error name-error"></span>
        <label htmlFor="job" className="popup__form-label"></label>
        <input
          type="text"
          className="popup__form-input popup__form-job"
          id="job"
          name="job"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description}
        />
        <div className="popup__line popup__line-job"></div>
        <span className="popup__input-error job-error"></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
