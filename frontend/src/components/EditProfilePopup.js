import { PopupWithForm } from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const userInfo = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(userInfo.name);
    setAbout(userInfo.about);
  }, [userInfo, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="input"
        id="userName"
        name="userName"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span id="userName-error" className="popup__error"></span>
      <input
        type="text"
        className="input"
        id="userJob"
        name="userJob"
        placeholder="About Me"
        required
        minLength="2"
        maxLength="200"
        value={about || ""}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span id="userJob-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
