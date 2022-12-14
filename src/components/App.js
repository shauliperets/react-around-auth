import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import React from "react";
import { api } from "../utils/api";
import { FormValidator } from "../utils/FormValidator";
import { settings } from "../utils/settings";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import authorizedImage from "../images/authorized.svg";
import { register, authorize } from "../utils/auth";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((response) => {
        setCurrentUser(response);

        enableValidation();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });

    api
      .getInitialCards()
      .then((response) => {
        setCards(response);
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  const handleCardClick = (event) => {
    setIsImagePopupOpen(true);
    setSelectedCard(event.target);
  };

  const handleCreateCardSubmit = (title, link) => {
    setIsLoading(true);

    api
      .addCard(title, link)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function setCardLikes(card, response) {
    const updateCards = cards.map((item) => {
      if (item._id === card._id) {
        return response;
      } else {
        return item;
      }
    });

    setCards(updateCards);
  }

  const handleEditProfileSubmit = (name, about) => {
    setIsLoading(true);

    api
      .setUserInfo(name, about)
      .then((response) => {
        setCurrentUser({ ...currentUser, name: response?.name, about: response?.about });
        console.log("response =>", response);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditAvatarSubmit = (avatar) => {
    setIsLoading(true);

    api
      .setProfileImage(avatar)
      .then((response) => {
        setCurrentUser({ ...currentUser, avatar: response?.avatar });
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsImagePopupOpen(false);
  }

  const handleLikeClick = (card) => {
    api
      .addRemoveLike(card._id, isLiked(card.likes, currentUser._id))
      .then((response) => {
        setCardLikes(card, response);
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });
  };

  function isLiked(likes, userId) {
    let result = false;
    let likesIds = [];

    likes.forEach((like) => {
      likesIds.push(like._id);
    });

    if (likesIds.includes(userId)) {
      result = true;
    }

    return result;
  }

  const handleDeleteCard = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardId));
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });
  };

  const formValidators = {};

  function enableValidation() {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));

    forms.forEach(function (form) {
      const validator = new FormValidator(settings, form);

      const formName = form.getAttribute("name");

      formValidators[formName] = validator;

      validator.enableValidation();
    });
  }

  function print() {
    console.log("print ");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <InfoTooltip
          isOpen={false}
          image={authorizedImage}
          title="Success! You have now been registered."
        ></InfoTooltip>

        <Switch>
          <Route path="/signin">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <Register handleSubmit={print}></Register>
          </Route>
        </Switch>
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          setCardLikes={setCardLikes}
          setCards={setCards}
          onCardLike={handleLikeClick}
          onCardDelete={handleDeleteCard}
          isLiked={isLiked}
        />
        <Footer />
        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          onSubmit={handleCreateCardSubmit}
          button={isLoading ? "Saving..." : "Save"}
        ></AddPlacePopup>
        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditProfileSubmit}
          button={isLoading ? "Saving..." : "Save"}
        ></EditProfilePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          button={isLoading ? "Saving..." : "Save"}
          onSubmit={handleEditAvatarSubmit}
        ></EditAvatarPopup>
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
