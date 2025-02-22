import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    setIsUpdating(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    }).finally(() => {
      setIsUpdating(false);
    });
  }
  React.useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);
  return (
    <>
      <PopupWithForm
        name={"profile-avatar"}
        title={"Cambiar foto de perfil"}
        isOpen={isOpen}
        buttonText={isUpdating ? "Guardando..." : "Guardar"}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label htmlFor="avatar" className="popup__form-label"></label>
        <input
          type="url"
          className="popup__form-input popup__profile-avatar"
          id="avatar"
          name="avatar"
          placeholder="Enlace a la imagen"
          required
          ref={avatarRef}
        />
        <div className="popup__line popup__line-avatar"></div>
        <span className="popup__input-error avatar-error"></span>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
