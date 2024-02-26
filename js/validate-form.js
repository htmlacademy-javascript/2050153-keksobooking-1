import { pluralize } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

const PRICE = /\d/;

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

const form = document.querySelector('.ad-form');
const formSubmitButton = form.querySelector('.ad-form__submit');
const formResetButton = form.querySelector('.ad-form__reset');
const adTitle = form.querySelector('#title');
const adPrice = form.querySelector('#price');
const houseType = form.querySelector('#type');
const adRoomNumber = form.querySelector('#room_number');
const adCapacity = form.querySelector('#capacity');
const adTimeOut = form.querySelector('#timeout');
const adTimeIn = form.querySelector('#timein');

const PriceByPropertyType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

let minPrice = 0;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const ErrorText = {
  INVALID_TYTLE: `Заголовок объявления должен быть от ${ MIN_TITLE_LENGTH } до ${ MAX_TITLE_LENGTH } символов`,
  INVALID_PRICE: 'Цена за ночь - это числовое поле',
  INVALID_TIME: 'Время заезда равно времени выезда'
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

// валидация заголовока объявления
const validateAdTitle = (title) =>
  title.length >= MIN_TITLE_LENGTH && title.length <= MAX_TITLE_LENGTH;

// валидация цены за ночь
const validateAdPrice = (priceField) => PRICE.test(+priceField);

//Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const filterMinPrice = (propertyType) => {
  Object.entries(PriceByPropertyType).map(([key, value]) => {
    if (propertyType === `${key}`) {
      minPrice = `${value}`;
    }
    return minPrice;
  });
};

const updateMinPrice = () => {
  houseType.addEventListener('change', (evt) => {
    evt.preventDefault();
    filterMinPrice(houseType.value);
    adPrice.setAttribute('max', Number(MAX_PRICE));
    adPrice.setAttribute('min', Number(minPrice));
  });
};
updateMinPrice();

const validateAdPriceAmount = (priceField) =>
  priceField <= MAX_PRICE && priceField >= minPrice;

const getErrorMessageAdPrice = () =>
  `Цена за ночь не должна привышать ${ MAX_PRICE } руб. и быть не менее ${ minPrice } руб.`;

houseType.addEventListener('change', () => {
  pristine.validate();
});

/*
Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей.
*/
const validateAdRooms = (value) => {
  const capacity = Number(adCapacity.value);
  const rooms = Number(value);

  if (rooms !== 100 && rooms >= capacity && capacity !== 0) {
    return true;
  }
  if (rooms === 100 && capacity === 0) {
    return true;
  }
  return false;
};

const getErrorCapacityMessage = () => {
  const rooms = Number(adRoomNumber.value);
  const capacity = Number(adCapacity.value);
  let errorCapacityMessage = '';

  if (rooms === 1 && capacity !== 1) {
    errorCapacityMessage = `${ rooms } ${pluralize(CAPACITY_MESSAGE.roomsForms, rooms)}
    для ${ rooms } ${pluralize(CAPACITY_MESSAGE.guestsForms, rooms)}`;
  }
  if (rooms === 2 && (capacity > 2 || capacity === 0)) {
    errorCapacityMessage = `${ rooms } ${pluralize(CAPACITY_MESSAGE.roomsForms, rooms)}
    для 1 или ${ rooms } ${pluralize(CAPACITY_MESSAGE.guestsForms, rooms)}`;
  }
  if (rooms === 3 && capacity === 0) {
    errorCapacityMessage = `${ rooms } ${pluralize(CAPACITY_MESSAGE.roomsForms, rooms)}
    для 1, 2 или ${ rooms } ${pluralize(CAPACITY_MESSAGE.guestsForms, rooms)}`;
  }
  if (rooms === 100 && capacity !== 0) {
    errorCapacityMessage = `${ rooms } ${pluralize(CAPACITY_MESSAGE.roomsForms, rooms)} не для гостей`;
  }
  return errorCapacityMessage;
};

// время на выезд должно быть равно времени на вьезд.
adTimeIn.addEventListener('change', (event) => {
  adTimeOut.value = event.target.value;
  pristine.validate();
});

adTimeOut.addEventListener('change', (event) => {
  adTimeIn.value = event.target.value;
  pristine.validate();
});


const validateTime = () =>
  (adTimeOut.value === adTimeIn.value);

pristine.addValidator(adTitle, validateAdTitle, ErrorText.INVALID_TYTLE, true);
pristine.addValidator(adPrice, validateAdPrice, ErrorText.INVALID_PRICE, true);
pristine.addValidator(adPrice, validateAdPriceAmount, getErrorMessageAdPrice, true);
pristine.addValidator(adRoomNumber, validateAdRooms, getErrorCapacityMessage, true);
pristine.addValidator(adTimeIn, validateTime, ErrorText.INVALID_TIME, true);
pristine.addValidator(adTimeOut, validateTime, ErrorText.INVALID_TIME, true);

adCapacity.addEventListener('change', () => pristine.validate());


const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonText.IDLE;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const resetForm = () => {
  pristine.reset();
  form.reset();
};

const onResetButtonClick = () => {
  resetForm();
};

formResetButton.addEventListener('click', onResetButtonClick);

const setOnFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      unblockSubmitButton();
    } else {
      blockSubmitButton();
    }
  });
};

export { resetForm, setOnFormSubmit };
