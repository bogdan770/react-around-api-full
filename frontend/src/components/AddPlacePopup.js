import { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCards(cardName, cardLink);
  }
  return (
    <PopupWithForm
      name="add-card"
      title="New place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Create"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="input"
        id="cardNameId"
        name="name"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        value={cardName || ""}
        onChange={(e) => setCardName(e.target.value)}
      />
      <span id="cardNameId-error" className="popup__error"></span>
      <input
        type="url"
        className="input"
        id="cardLinkId"
        name="link"
        placeholder="Image URL"
        required
        value={cardLink || ""}
        onChange={(e) => setCardLink(e.target.value)}
      />
      <span id="cardLinkId-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
