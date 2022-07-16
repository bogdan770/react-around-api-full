import React,{ useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from "./Main";
import { ImagePopup } from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { InfoToolTip } from './InfoToolTip';
import '../index.css';

import api from "../utils/api";
import Register from "./Register"
import Login from './Login';
import {ProtectedRoute} from './ProtectedRoute';
import * as auth from '../utils/auth';
import { token } from '../utils/auth';
import Layout from './Layout';


function App() {
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsStateEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const localEmail = localStorage.getItem('localEmail');

  const navigate = useNavigate();
  const location = useLocation();

  

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));

    api
      .getCardList()
      .then((res) => {
        setCards(
          res.map((card) => ({
            link: card.link,
            name: card.name,
            likes: card.likes,
            owner: card.owner,
            _id: card._id,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        if (location.pathname === '/signup' && isRegistered) {
          navigate('/signin', { replace: true });
          closeAllPopups();
        }
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.getItem(token);
      auth
        .checkToken(token)
        .then(() => {
          setIsRegistered(true);
          navigate('/', { replace: true });
        })
        .catch((err) => console.log(`Error.....: ${err}`));
    }
  }, []);

  function handleLogin() {
    return new Promise((res) => {
      setIsRegistered(true);
      res();
    }).catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleLogout() {
    return new Promise((res) => {
      setIsRegistered(false);
      res();
    })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('localEmail');
      })
      .then(() => {
        navigate('/signin', { replace: true });
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleInputEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('localEmail', email);
          handleLogin().then(() => {
            navigate('/');
          });
        }
      })
      .catch((err) => {
        console.log(`Error.....: ${err}`);
      });
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    auth
      .register(email, password)
      .then((result) => {
        if (result.data && result.data._id) {
          handleSetRegistration();
        }
      })
      .catch((err) => {
        console.log(`Error.....: ${err}`);
        setIsRegistered(false);
      })
      .finally(handleSubmitInfoToolTip);
  }

  function handleSetRegistration() {
    setIsRegistered(true);
  }

  function handleCloseSuccessPopup() {
    navigate('/signin');
    closeAllPopups();
  }

  function handleSubmitInfoToolTip() {
    setIsInfoToolTipPopupOpen(true);
  }


  function handleEditAvatarClick() {
    setIsStateEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIAddPlacePopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIAddPlacePopupOpen(false);
    setIsStateEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteCard(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const cardCopy = cards.filter((c) => c._id !== card._id);
        setCards(cardCopy);
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name,
          about,
        });
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar,
        });
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" 
          element={
            <Layout
              handleLogout={handleLogout}
              isRegistered={isRegistered}
              localEmail={localEmail}
            />
          }
        >
          <Route
            index
            element={
              <ProtectedRoute isRegistered={isRegistered}>
                <Main
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditProfileClick={handleEditProfileClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCard}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateCards={handleAddPlaceSubmit}
                />

                <ImagePopup
                  selectedCard={selectedCard}
                  isOpen={isImagePopupOpen}
                  isClose={closeAllPopups}
                />
              </ProtectedRoute>
            }
            />
            <Route
            path="signup"
            element={
              <>
                <Register
                  handleSubmitInfoToolTip={handleSubmitInfoToolTip}
                  handleSetRegistration={handleSetRegistration}
                  handleSubmitRegister={handleSubmitRegister}
                  isRegistered={isRegistered}
                  handleInputEmail={handleInputEmail}
                  handleInputPassword={handleInputPassword}
                  email={email}
                  password={password}
                />
              </>
            }
          />

          <Route
            path="signin"
            element={
              <>
                <Login
                  handleSubmitInfoToolTip={handleSubmitInfoToolTip}
                  handleInputEmail={handleInputEmail}
                  handleInputPassword={handleInputPassword}
                  email={email}
                  password={password}
                  handleSubmitLogin={handleSubmitLogin}
                />
              </>
            }
          />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <h1>Error 404: There's nothing here!</h1>
              </main>
            }
          />
        </Route>
      </Routes>
          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            closeAllPopups={closeAllPopups}
            isRegistered={isRegistered}
            handleCloseSuccessPopup={handleCloseSuccessPopup}
            />
    </CurrentUserContext.Provider>
  );
          }


export default App;
