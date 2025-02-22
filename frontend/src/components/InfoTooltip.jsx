function InfoTooltip({ name, message, icon, onClose, isOpen }) {
  return (
    <>
      <section
        className={`popup popup-${name} ${isOpen ? "popup__opened" : " "}`}
      >
        <div className="popup__container">
          <button
            className="popup__close-button"
            onClick={onClose}
          ></button>
          <img
            src={icon}
            alt={`imagen de ${name}`}
            className="popup__info-image"
          />
          <p className="popup__info-message">{`${message}`}</p>
        </div>
      </section>
    </>
  );
}

export default InfoTooltip;