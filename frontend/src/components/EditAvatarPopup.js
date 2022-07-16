import { PopupWithForm } from "./PopupWithForm";
import { useRef, useEffect } from "react";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="input"
        id="avatatLinkId"
        name="avatar"
        placeholder="Image link"
        required
        ref={inputRef}
        defaultValue={""}
      />
      <span id="avatatLinkId-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
