import { pluralize } from './util.js';

const CAPACITY_MESSAGE = {
  roomsForms: [
    'Комната-студия',
    'комната',
    'комнаты'
  ],
  guestsForms: [
    '',
    'гостя',
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
  if (roomsNumber === 0) {
    CapacityMessage = `${pluralize(CAPACITY_MESSAGE.roomsForms, roomsNumber)} для
    ${ guestsNumber } ${pluralize(CAPACITY_MESSAGE.guestsForms, guestsNumber)}`;
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

// создание клонированого изображений по шаблону
const createCard = ({ author, offer }) => {

  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
  card.querySelector('.popup__type').textContent = offer.type;
  card.querySelector('.popup__text--capacity').textContent = getCapacityMessage(offer.rooms, offer.guests);
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
  card.querySelector('.popup__description').textContent = offer.description;

  const cardFeatures = card.querySelector('.popup__features');
  const featuresList = cardFeatures.querySelectorAll('.popup__feature');

  filterFeatures(offer.features, featuresList);

  const cardPhotos = card.querySelector('.popup__photos');

  offer.photos.forEach((photo) => {
    const cardPhoto = card.querySelector('.popup__photo');
    cardPhotos.src = photo;
    cardPhotos.append(cardPhoto);
  });

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