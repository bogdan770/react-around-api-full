function ImagePopup(props) {
  return (
    <div className={`popup image-popup ${props.isOpen ? "popup_display" : ""}`}>
      <div className="popup__box-image">
        <button
          className="image-popup__button-close popup__close "
          type="button"
          onClick={props.isClose}
        ></button>
        <img
          className="image-popup__image"
          alt={props.selectedCard.name}
          src={props.selectedCard.link}
        />
        <p className="image-popup__title">{props.selectedCard.name}</p>
      </div>
    </div>
  );
}

export { ImagePopup };
