import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "../pages/index.css";
import popupCross from "../images/popup__cross.svg";
import popupCheck from "../images/popup__check.svg";
import api from "../utils/Api.js";
import * as auth from '../utils/auth.js'
import * as token from '../utils/token.js'
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Main from "./Main.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Footer from "./Footer.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {

  //User info
  const [currentUser, setCurrentUser] = React.useState();
  /*React.useEffect(() => {
    api.getUserInfo().then((user) => setCurrentUser(user));
  }, []);*/

  //Popups
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const onEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const onEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const [isAddElementPopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const onAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] =
    React.useState(false);
  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setConfirmDeletePopupOpen(true);
  };
  //Cerrar popups
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setInfoErrorPopupOpen(false);
    setInfoOkPopupOpen(false);
  };
  // Cerrar popups con "escape" o click afura del component
  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key == "Escape" && closeAllPopups();
    });
    document.addEventListener("click", (e) => {
      e.target.classList.contains("popup") && closeAllPopups();
    });
  });

  //Cards
  const [isCards, setIsCards] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  //Borrar tarjetas
  const handleConfirmDeleteCard = () => {
    if (cardToDelete) {
      return api.deleteCard(cardToDelete?._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      });
    }
  };
  //Card Likes
  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes?.some((i) => i === currentUser._id);
    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then(({data}) => {
      setCards((state) => state.map((c) => (c._id === card._id ? { ...c, likes: data.likes } : c)));
    });
  }
  //Actualizar info perfil
  const handleUpdateUser = async ({ name, about }) => {
    return await api.patchUserInfo(name, about).then(({data}) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  };
  //Crear nueva tarjeta
  const handleAddPlace = async ({ name, url }) => {
    return await api.postNewCard(name, url).then(({data}) => {
      setCards([data, ...cards]);
      closeAllPopups();
    });
  };
  //Actualizar avatar
  const handleUpdateAvatar = async ({ avatar }) => {
    return await api.patchUserAvatar(avatar).then(({data}) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  };
  //Popup de imagen
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState([]);
  const funcSelectCard = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  //Login
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const handleLogin = async ({email, password}) => {
    return await auth.login(email, password)
      .then(({token}) => {
        updateUserInfo();
        setEmail(email);
        setIsLoggedIn(true);
        if (token) {
          localStorage.setItem("jwt", token);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  }

  //Registration
  const handleRegistration = async ({email, password}) => {
    return await auth.register(email, password)
      .then(() => {
        navigate("/login");
        setInfoOkPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoErrorPopupOpen(true);
      });
  }

  //Popup info registro y login
  const [isInfoErrorPopupOpen, setInfoErrorPopupOpen] = React.useState(false);
  const [isInfoOkPopupOpen, setInfoOkPopupOpen] = React.useState(false);

  //email
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  //update user info
  const updateUserInfo = () => {
    api.getUserInfo().then(({data}) => {
      if(data) {
        setCurrentUser(data);
        setIsLoggedIn(true);
        navigate('/');
        setEmail( data.email );
      }
    })
  }

  //logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmail('');
    navigate("/login");
  }

  //Checeo de si hay una sesion iniciada
  React.useEffect(() => {
    if (isLoggedIn) {
      const jwt = token.getToken();

    if (!jwt) {
      navigate("/login");
      return;
    }
    auth
      .getUserToken(jwt)
      .then((  user ) => {
        console.log(user);
        setCurrentUser(user);
        setEmail( user.email );
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
      api.getInitialCards().then(({data}) => {
        setCards(data);
      });
    }
  }, [isLoggedIn]);

  //Checeo de token
  React.useEffect(() => {
    const jwt = token.getToken();

    if (!jwt) {
      navigate("/login");
      return;
    }
    auth
      .getUserToken(jwt)
      .then((  user ) => {
        console.log(user);
        setCurrentUser(user);
        setEmail( user.email );
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header
        handleLogout={handleLogout}
        email={email}
        currentUser={currentUser}
        />
        <Routes>

          <Route
            path="*"
            element={
            isLoggedIn ? (
            <Navigate to="/" replace/>
            ) : (
            <Navigate to="/login" replace/>
            )
            }
          />

          <Route path="/register" element={
            <>
            <Register
          isOpen={true}
          onRegistration={handleRegistration}
        />
        <InfoTooltip
            name={'error'}
            message={'Uy, algo salió mal. Por favor, inténtalo de nuevo.'}
            icon={popupCross}
            onClose={closeAllPopups}
            isOpen={isInfoErrorPopupOpen}
            />
        </>
        } />

          <Route path="/login" element={
            <>
            <Login
          isOpen={true}
          onLogin={handleLogin}
        />
        <InfoTooltip
            name={'aprobed'}
            message={'¡Correcto! Ya estás registrado.'}
            icon={popupCheck}
            onClose={closeAllPopups}
            isOpen={isInfoOkPopupOpen}
            />
            </>
            } />

          <Route path="/" element={
          <>
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Main
          handleEditAvatarClick={onEditAvatarClick}
          handleEditProfileClick={onEditProfileClick}
          handleAddPlaceClick={onAddPlaceClick}
          cards={cards}
          isCards={isCards}
          handleCardLike={handleCardLike}
          funcDeleteCard={handleDeleteClick}
          funcSelectCard={funcSelectCard}
          selectedCard={selectedCard}
          closeAllPopups={closeAllPopups}
          isImagePopupOpen={isImagePopupOpen}
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
          isOpen={isAddElementPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleConfirmDeleteCard}
        />
        </ProtectedRoute>
          </>
        } />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export { App };
