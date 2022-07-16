import React, { useContext } from "react";
// import { ImagePopup } from "./ImagePopup";
// import { api } from "../utils/api";
import { Card } from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onAddPlaceClick,
  onEditProfileClick,
  onEditAvatarClick,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const userInfoContext = useContext(CurrentUserContext);

  return (
    <main className="page">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${userInfoContext.avatar})` }}
        >
          <button
            className="profile__avatar-btn"
            onClick={onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__username">{userInfoContext.name}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfileClick}
            type="button"
          ></button>
          <p className="profile__userprof">{userInfoContext.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlaceClick}
          type="button"
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__grid">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                id={card._id}
                key={card._id}
                link={card.link}
                title={card.name}
                likes={`${card.likes.length}`}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
