import React from 'react';
import { Link } from 'react-router-dom';

export default function Login({
  handleInputEmail,
  handleInputPassword,
  email,
  password,
  handleSubmitLogin,
}) {
  return (
    <section className={`register register_type_login`}>
      <h2 className="register__title">Log in</h2>
      <form className="register__form" onSubmit={handleSubmitLogin}>
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
          Log in
        </button>
      </form>
      <Link to="/signup" className="register__link">
        Not a member yet? Sign up here!
      </Link>
    </section>
  );
}