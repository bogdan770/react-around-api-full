import React from 'react';
import { useLocation } from 'react-router-dom';
import fail from '../images/fail.png';
import success from '../images/success.png';

export const InfoToolTip = ({
  closeAllPopups,
  isOpen,
  isRegistered,
  handleCloseSuccessPopup,
}) => {
  const location = useLocation();

  return (
    <section
      className={[
        'popup popup_type_info-tool-tip',
        isOpen ? 'popup_display' : '',
      ].join(' ')}
    >
      <div className="popup__container popup__container_type_info-tool-tip">
        {isRegistered ? (
          <>
            <button
              className="popup__close button button_hover_dark"
              type="button"
              onClick={handleCloseSuccessPopup}
            />
            <img
              src={success}
              alt="Success checkmark"
              className="info-tool-tip__image"
            />
            <h2 className="popup__title info-tool-tip__title">
              Success! You have now been registered.
            </h2>
          </>
        ):
         (
          <>
            <button
              className="popup__close  button button_hover_dark"
              type="button"
              onClick={closeAllPopups}
            />
            <img
              src={fail}
              alt="X for failure to register"
              className="info-tool-tip__image"
            />
            <h2 className="popup__title info-tool-tip__title">
              Oops, something went wrong! Please try again.
            </h2>
          </>
        )}
      </div>
    </section>
  );
};