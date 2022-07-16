import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from "../images/around.svg";

export default function Header({ handleLogout, isRegistered, localEmail }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="enter enter__hover">
        <img src={headerLogo} alt="Around the U.S. logo" className="header__logo" />
      </Link>

      <div className="header__user-area">
        <p className="header__email">{localEmail}</p>
        {localEmail && location.pathname === '/' && (
          <Link
            onClick={handleLogout}
            to="/signin"
            replace
            className="enter enter__hover"
          >
            Log out
          </Link>
        )}
        {location.pathname === '/signin' && !isRegistered && (
          <Link className="enter enter__hover" to="signup">
            Sign up
          </Link>
        )}
        {location.pathname === '/signup' && !isRegistered && (
          <Link className="enter enter__hover" to="signin">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
