// находим template '#card'
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// находим контейнер для новосозданных карточек, временно
const cardContainer = document.querySelector('#map-canvas');

// выведение правильного сообщения по количеству комнат и гостей
const getCorrectCapacityMessage = (rooms, guests) => {
  let message = `${ rooms } комнаты для ${ guests } гостей`;
  if (rooms === 0 && guests > 1) {
    message = `Общая комната для ${ guests } гостей`;
  }
  if (rooms === 0 && guests === 1) {
    message = `Общая комната для ${ guests } гостя`;
  }
  if (rooms === 1 && guests > 1) {
    message = `${ rooms } комната для ${ guests } гостей`;
  }
  if (rooms === 1 && guests === 1) {
    message = `${ rooms } комната для ${ guests } гостя`;
  }
  if (rooms > 1 && guests === 1) {
    message = `${ rooms } комнаты для ${ guests } гостя`;
  }
  return message;
};

// оставляем нужные элементы в характиристиках съемного жилья
const getFeatures = (features, featuresList) => {
  const modifiers = features.map((feature) => `popup__feature--${ feature }`);

  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1]; // 1 - это индекс нужного класса в атрибуте class

    if (!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
};

// выводим фотографии жилья в аренду
const createCardPhotos = (photos, conteiner) => {
  photos.forEach((photo) => {
    conteiner.innerHTML = '';
    const photoImg = document.createElement('img');

    photoImg.classList.add('popup__photo');
    photoImg.src = photo;
    photoImg.width = 45;
    photoImg.height = 40;
    photoImg.alt = 'Фотография жилья';

    conteiner.append(photoImg);
  });
};

// создание клонированого изображений по шаблону
const createCard = ({ author, offer }) => {

  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = offer.price;
  card.querySelector('.popup__type').textContent = offer.type;
  card.querySelector('.popup__text--capacity').textContent = getCorrectCapacityMessage(offer.rooms, offer.guests);
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
  card.querySelector('.popup__description').textContent = offer.description;

  const cardFeatures = card.querySelector('.popup__features');
  const featuresList = cardFeatures.querySelectorAll('.popup__feature');
  const features = offer.features;

  getFeatures(features, featuresList);

  const cardPhotos = card.querySelector('.popup__photos');
  const photos = offer.photos;

  createCardPhotos(photos, cardPhotos);

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
