import React from "react";
import profileAvatar from "../images/profile__image.jpg";
import Elements from "./Elements.jsx";
import Spinner from "./Spinner.jsx";
import Card from "./Card.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  cards,
  isCards,
  handleCardLike,
  funcDeleteCard,
  funcSelectCard,
  selectedCard,
  closeAllPopups,
  isImagePopupOpen,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__column-left">
            <div className="profile__avatar-container">
              <img
                src={`${
                  !currentUser?.avatar.length == 0
                    ? currentUser?.avatar
                    : profileAvatar
                }`}
                alt="imagen de perfil"
                className="profile__avatar"
              />
              <button
                onClick={handleEditAvatarClick}
                className="profile__avatar-edit"
              ></button>
            </div>
            <div className="profile__info">
              <div className="profile__name-content">
                <h3 className="profile__name">{`${
                  !currentUser?.name.length == 0
                    ? currentUser?.name
                    : "Cargando..."
                }`}</h3>
                <button
                  onClick={handleEditProfileClick}
                  className="profile__button-edit"
                ></button>
              </div>
              <p className="profile__job">{`${
                !currentUser?.about.length == 0
                  ? currentUser?.about
                  : "Cargando..."
              }`}</p>
            </div>
          </div>

          <div className="profile__column-right">
            <button
              onClick={handleAddPlaceClick}
              className="profile__button-add"
            >
              +
            </button>
          </div>
        </section>

        <Elements>
          <Spinner isCards={isCards} />
          {cards.map((item) => {
            return (
              <Card
                handleCardLike={handleCardLike}
                card={item}
                url={item.link}
                name={item.name}
                likes={item.likes.length}
                key={item._id}
                handleDeleteCard={funcDeleteCard}
                handleSelectedCard={funcSelectCard}
              />
            );
          })}
        </Elements>
        {selectedCard && (
          <ImagePopup
            name={"image-fullscreen"}
            selectedCard={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
        )}
      </main>
    </>
  );
}

export default Main;
