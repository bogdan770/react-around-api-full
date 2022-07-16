import React from 'react';
import { Link } from 'react-router-dom';

export default function Register({
  handleInputEmail,
  handleInputPassword,
  email,
  password,
  handleSubmitRegister,
}) {
  return (
    <section className={`register register_type_signup`}>
      <h2 className="register__title">Sign up</h2>
      <form className="register__form" onSubmit={handleSubmitRegister}>
        <input
          type="email"
          className="register__input"
          placeholder="Email"
          id="email-input"
          name="email"
          value={email || ''}
          onChange={handleInputEmail}
          required
        />
        <input
          type="password"
          className="register__input"
          placeholder="Password"
          id="password-input"
          name="password"
          value={password || ''}
          onChange={handleInputPassword}
          required
          minLength="2"
          maxLength="40"
          pattern=".*\S.*"
        />
        <button className="register__button" type="submit">
          Sign up
        </button>
      </form>
      <Link to="/signin" className="register__link">
        Already a member? Log in here!
      </Link>
    </section>
  );
}

