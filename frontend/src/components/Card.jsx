import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Card({
  card,
  url,
  name,
  likes,
  handleDeleteCard,
  handleSelectedCard,
  handleCardLike,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  const isLiked = card.likes.some((i) => i === currentUser?._id);
  const deleteCard = () => {
    handleDeleteCard(card);
  };
  const clickImage = () => {
    handleSelectedCard(card);
  };
  const onCardLike = () => {
    console.log(currentUser);
    console.log(isOwn);
    console.log(isLiked);
    console.log(card.owner);
    handleCardLike(card);
  };

  return (
    <div className="element">
      <div className="element__image-content">
        <img
          src={url}
          onClick={clickImage}
          alt={`imagen de ${name}`}
          className="element__image"
        />
        <button
          className={`${
            isOwn ? "element__button-trash" : "element__button-trash-hide"
          }`}
          onClick={deleteCard}
        ></button>
      </div>
      <div className="element__footer">
        <p className="element__name">{name}</p>
        <div className="element__like-container">
          <button
            className={`${
              isLiked ? "element__button-like-active" : "element__button-like"
            }`}
            onClick={onCardLike}
          ></button>
          <p
            className={`${
              likes ? "element__likes" : "element__likes-disactive"
            }`}
          >
            {likes}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
