function ImagePopup({ name, selectedCard, onClose, isOpen }) {
  if (!selectedCard) {
    return null;
  }
  return (
    <>
      <section
        className={`popup popup-${name} ${isOpen ? "popup__opened" : " "}`}
      >
        <div className="popup__container-image">
          <button
            className="popup__close-button popup__close-image"
            onClick={onClose}
          ></button>
          <img
            src={selectedCard.link}
            alt={`imagen de ${selectedCard.name}`}
            className="popup__image"
          />
          <h5 className="popup__title-image">{selectedCard.name}</h5>
        </div>
      </section>
    </>
  );
}

export default ImagePopup;
