import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export function Card({
  card,
  _id,
  link,
  title,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const userInfoContext = useContext(CurrentUserContext);
  const isOwn = card.owner._id === userInfoContext._id;
  const isLiked = card.likes.some((user) => user._id === userInfoContext._id);

  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete" : "element__delete_hidden"
  }`;

  const cardLikeButtonClassName = `${
    isLiked ? "element__like_active element__like" : "element__like"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleClickLike() {
    onCardLike(card);
  }

  function handleDeleteButton() {
    onCardDelete(card);
  }

  return (
      <li className="element">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteButton}
        ></button>
        <img
          className="element__image"
          onClick={handleClick}
          src={link}
          alt={card.name}
        />
        <div className="element__conteiner">
          <h2 className="element__title">{title}</h2>
          <div className="element__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleClickLike}
            ></button>
            <span className="element__like-count">{likes}</span>
          </div>
        </div>
      </li>
  );
}
