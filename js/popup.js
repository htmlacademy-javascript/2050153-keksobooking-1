import { pluralize } from './util.js';
import { addPostedMarker } from './map.js';

const CAPACITY_MESSAGE = {
  roomsForms: [
    'комната',
    'комнаты',
    'комнат'
  ],
  guestsForms: [
    'гостя',
    'гостей',
    'гостей'
  ]
};

// находим template '#card'
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// находим контейнер для новосозданных карточек, временно
const cardContainer = document.querySelector('#map-canvas');

// выведение сообщение по количеству комнат и гостей
const getCapacityMessage = (roomsNumber, guestsNumber) => {
  let CapacityMessage = '';
  if (guestsNumber === 0) {
    CapacityMessage = `${ roomsNumber } ${pluralize(CAPACITY_MESSAGE.roomsForms, roomsNumber)}
     не для гостей`;
  } else {
    CapacityMessage = `${ roomsNumber } ${pluralize(CAPACITY_MESSAGE.roomsForms, roomsNumber)} для
    ${ guestsNumber } ${pluralize(CAPACITY_MESSAGE.guestsForms, guestsNumber)}`;
  }
  return CapacityMessage;
};

// фильтруем нужные элементы в характиристиках съемного жилья
const filterFeatures = (features, featuresList) => {
  featuresList.forEach((featuresListItem) => {
    const isNecessary = features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${ feature }`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
};

const checkCard = (card, objKey, elementClass, contentType, specialOutcome) => {
  const element = card.querySelector(elementClass);
  if (objKey === 'undefined') {
    element.style.display = 'none';
  } else {
    if (contentType === 'textContent') {
      element.textContent = specialOutcome ?? objKey;
    }
    if (contentType === 'src') {
      element.src = objKey;
    }
  }
};

// создание клонированого изображений по шаблону
const createCard = ({ author, offer, location }) => {
  const card = cardTemplate.cloneNode(true);

  checkCard(card, author.avatar, '.popup__avatar', 'src');
  checkCard(card, offer.title, '.popup__title', 'textContent');
  checkCard(card, offer.address, '.popup__text--address', 'textContent');
  checkCard(card, offer.price, '.popup__text--price', 'textContent', `${ offer.price } ₽/ночь`);
  checkCard(card, offer.type, '.popup__type', 'textContent');
  checkCard(card, offer.rooms, '.popup__text--capacity', 'textContent', getCapacityMessage(offer.rooms, offer.guests));
  checkCard(card, offer.checkin, '.popup__text--time', 'textContent', `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`);
  checkCard(card, offer.description, '.popup__description', 'textContent');

  const cardFeatures = card.querySelector('.popup__features');
  const featuresList = cardFeatures.querySelectorAll('.popup__feature');

  if (typeof offer.features === 'undefined') {
    cardFeatures.style.display = 'none';
  } else {
    filterFeatures(offer.features, featuresList);
  }

  const cardPhotos = card.querySelector('.popup__photos');

  if (typeof offer.photos === 'undefined') {
    cardPhotos.style.display = 'none';
  } else {
    offer.photos.forEach((photo) => {
      const cardPhoto = card.querySelector('.popup__photo');
      cardPhoto.src = photo;
      cardPhotos.append(cardPhoto);
    });
  }

  addPostedMarker(location, card);
  return card;
};

// удаляем содержимое созданной карты/popup
const resetCard = () => {
  cardContainer.querySelectorAll('.popup').forEach((element) => element.remove());
};

// добавление клонированного предложения в контейнер "#map-canvas", временно
const renderCard = (offers) => {
  resetCard();
  const fragment = document.createDocumentFragment();

  offers.forEach((offer) => {
    const popupCard = createCard(offer);
    fragment.append(popupCard);
  });

  cardContainer.append(fragment);
};

export { renderCard };
