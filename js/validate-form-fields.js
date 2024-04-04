import { pluralize } from './util.js';
import { updateSlider } from './form-fields.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

const PRICE = /\d/;

const CapacityMessage = {
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

const PriceByPropertyType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const adPrice = form.querySelector('#price');
const houseType = form.querySelector('#type');
const adRoomNumber = form.querySelector('#room_number');
const adCapacity = form.querySelector('#capacity');
const adTimeOut = form.querySelector('#timeout');
const adTimeIn = form.querySelector('#timein');

const ErrorText = {
  TYTLE: `Заголовок объявления должен быть от ${ MIN_TITLE_LENGTH } до ${ MAX_TITLE_LENGTH } символов`,
  PRICE: 'Цена за ночь - это числовое поле',
  TIME: 'Время заезда равно времени выезда'
};

let minPrice = PriceByPropertyType[houseType.value];

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextClass: 'ad-form__element--invalid',
});

//изменение времени въезда и выезда. оно должно равняться друг-другу
const changeField = (changedField, comparedField) => {
  changedField.addEventListener('change', (event) => {
    comparedField.value = event.target.value;
    pristine.validate(comparedField);
  });
};
changeField(adTimeIn, adTimeOut);
changeField(adTimeOut, adTimeIn);

// валидация заголовока объявления
const validateTitle = (title) =>
  title.length >= MIN_TITLE_LENGTH && title.length <= MAX_TITLE_LENGTH;

// валидация цены за ночь
const validatePrice = (priceField) => PRICE.test(+priceField);

//Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const updateMinPrice = (propertyType) => {
  minPrice = Number(PriceByPropertyType[propertyType]);
  adPrice.setAttribute('min', Number(minPrice));
  adPrice.setAttribute('max', Number(MAX_PRICE));
  adPrice.placeholder = minPrice;
  updateSlider(minPrice);
};

const validatePriceAmount = (priceField) =>
  (priceField <= MAX_PRICE && priceField >= minPrice);

const getErrorMessageAdPrice = () =>
  `Цена за ночь не должна привышать ${ MAX_PRICE } руб. и быть не менее ${ minPrice } руб.`;

// Поле «Количество комнат» синхронизировано с полем «Количество мест»
const validateRooms = (value) => {
  const capacityValue = Number(adCapacity.value);
  const roomsValue = Number(value);

  if (roomsValue !== 100 && roomsValue >= capacityValue && capacityValue !== 0) {
    return true;
  }
  if (roomsValue === 100 && capacityValue === 0) {
    return true;
  }
  return false;
};

const getErrorCapacityMessage = () => {
  const roomsNumber = Number(adRoomNumber.value);
  const capacityNumber = Number(adCapacity.value);
  let errorCapacityMessage = '';

  if (roomsNumber === 1 && capacityNumber !== 1) {
    errorCapacityMessage = `${ roomsNumber } ${pluralize(CapacityMessage.roomsForms, roomsNumber)}
    для ${ roomsNumber } ${pluralize(CapacityMessage.guestsForms, roomsNumber)}`;
  }
  if (roomsNumber === 2 && (capacityNumber > 2 || capacityNumber === 0)) {
    errorCapacityMessage = `${ roomsNumber } ${pluralize(CapacityMessage.roomsForms, roomsNumber)}
    для 1 или ${ roomsNumber } ${pluralize(CapacityMessage.guestsForms, roomsNumber)}`;
  }
  if (roomsNumber === 3 && capacityNumber === 0) {
    errorCapacityMessage = `${ roomsNumber } ${pluralize(CapacityMessage.roomsForms, roomsNumber)}
    для 1, 2 или ${ roomsNumber } ${pluralize(CapacityMessage.guestsForms, roomsNumber)}`;
  }
  if (roomsNumber === 100 && capacityNumber !== 0) {
    errorCapacityMessage = `${ roomsNumber } ${pluralize(CapacityMessage.roomsForms, roomsNumber)} не для гостей`;
  }
  return errorCapacityMessage;
};

// время на выезд должно быть равно времени на вьезд.
const validateTime = () => (adTimeOut.value === adTimeIn.value);

// при изменении поля с типом жилья
const onHouseTypeChange = () => {
  updateMinPrice(houseType.value);
  pristine.validate(adPrice);
};

pristine.addValidator(titleField, validateTitle, ErrorText.TYTLE, true);
pristine.addValidator(adPrice, validatePrice, ErrorText.PRICE, true);
pristine.addValidator(adPrice, validatePriceAmount, getErrorMessageAdPrice, true);
pristine.addValidator(adRoomNumber, validateRooms, getErrorCapacityMessage, true);
pristine.addValidator(adTimeIn, validateTime, ErrorText.TIME, true);
pristine.addValidator(adTimeOut, validateTime, ErrorText.TIME, true);

adCapacity.addEventListener('change', () => pristine.validate(adRoomNumber));
houseType.addEventListener('change', onHouseTypeChange);

export { pristine };
