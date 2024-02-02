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

// // выведение правильного сообщения по количеству комнат и гостей
// // предыдущий вариант
// const getPluralCapacityMessage = (rooms, guests) => {
//   let message = `${ rooms } комнаты для ${ guests } гостей`;
//   if (rooms === 0 && guests > 1) {
//     message = `Общая комната для ${ guests } гостей`;
//   }
//   if (rooms === 0 && guests === 1) {
//     message = `Общая комната для ${ guests } гостя`;
//   }
//   if (rooms === 1 && guests > 1) {
//     message = `${ rooms } комната для ${ guests } гостей`;
//   }
//   if (rooms === 1 && guests === 1) {
//     message = `${ rooms } комната для ${ guests } гостя`;
//   }
//   if (rooms > 1 && guests === 1) {
//     message = `${ rooms } комнаты для ${ guests } гостя`;
//   }
//   return message;
// };

// выведение сообщение по количеству комнат и гостей
const getPluralMessage = (forms, number) => {
  let idx;

  if (number === 0) {
    idx = 0; // zero
  } else if (number === 1) {
    idx = 1; // one
  } else {
    idx = 2; // few
  }

  return forms[idx] || '';
};

const getCapacityMessage = (roomsNumber, guestsNumber) => {
  let CapacityMessage = '';
  if (roomsNumber === 0) {
    CapacityMessage = `${getPluralMessage(CAPACITY_MESSAGE.roomsForms, roomsNumber)} для
    ${ guestsNumber } ${getPluralMessage(CAPACITY_MESSAGE.guestsForms, guestsNumber)}`;
  } else {
    CapacityMessage = `${ roomsNumber } ${getPluralMessage(CAPACITY_MESSAGE.roomsForms, roomsNumber)} для
    ${ guestsNumber } ${getPluralMessage(CAPACITY_MESSAGE.guestsForms, guestsNumber)}`;
  }
  return CapacityMessage;
};

// оставляем нужные элементы в характиристиках съемного жилья
const filterFeatures = (features, featuresList) => {
  // 1-й вариант
  // const modifiers = features.map((feature) => `popup__feature--${ feature }`);

  // featuresList.forEach((featuresListItem) => {
  //   const modifier = featuresListItem.classList[1]; // 1 - это индекс нужного класса в атрибуте class

  //   if (modifiers.include(modifier)) {
  //     featuresListItem.remove();
  //   }
  // });

  // 2-й вариант
  featuresList.forEach((featuresListItem) => {
    const isNecessary = features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${ feature }`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
};

// // выводим фотографии жилья в аренду
// const createCardPhotos = (photos, container) => {
//   // photos.forEach((photo) => {
//   //   container.innerHTML = '';
//   //   const photoImg = document.createElement('img');

//   //   photoImg.classList.add('popup__photo');
//   //   photoImg.src = photo;
//   //   photoImg.width = 45;
//   //   photoImg.height = 40;
//   //   photoImg.alt = 'Фотография жилья';

//   //   container.append(photoImg);
//   const fragment = document.createDocumentFragment();

//   photos.forEach((photo) => {
//     const popupPhoto = createCard(photo);
//     fragment.append(popupPhoto);
//   });

//   container.append(fragment);
// };

// создание клонированого изображений по шаблону
const createCard = ({ author, offer }) => {

  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  // const priceAbbreviation = card.querySelector('.popup__text--price > span');
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
