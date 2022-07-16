function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_display" : ""
      }`}
    >
      <div className="popup__box">
        <h2 className="popup__title">{props.title}</h2>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          name={props.name}
          onSubmit={props.onSubmit}
          // id="popup__form-edit"
          className="popup__form"
        >
          <button className="popup__button" type="submit">
            {props.buttonText}
          </button>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export { PopupWithForm };
