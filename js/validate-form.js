const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

const PRICE = /\d/;

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

let minPrice = 0;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const ErrorText = {
  INVALID_TYTLE: `Заголовок объявления должен быть от ${ MIN_TITLE_LENGTH } до ${ MAX_TITLE_LENGTH } символов`,
  INVALID_PRICE: 'Цена за ночь - это числовое поле',
  // INVALID_PRICE_AMOUNT: `Цена за ночь не должна привышать ${ MAX_PRICE } руб. и быть не менее ${ minPrice }`,
  INVALID_TIME: 'Время заезда равно времени выезда'
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

// валидация заголовока объявления
const validateAdTitle = (title) => {
  if (title >= MIN_TITLE_LENGTH && title <= MAX_TITLE_LENGTH) {
    return true;
  }
  return false;
};

// валидация цены за ночь
const validateAdPrice = (priceField) => PRICE.test(+priceField);

//Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const filterMinPrice = (propertyType) => {
  if (propertyType === 'flat') {
    minPrice = 1000;
  }
  if (propertyType === 'hotel') {
    minPrice = 3000;
  }
  if (propertyType === 'house') {
    minPrice = 5000;
  }
  if (propertyType === 'palace') {
    minPrice = 10000;
  }
  return minPrice;
};

const addMinPrice = () => {
  filterMinPrice(houseType.value);
  adPrice.setAttribute('max', Number(MAX_PRICE));
  adPrice.setAttribute('min', Number(minPrice));
};

const validateAdPriceAmount = (priceField) => {
  addMinPrice();
  if (priceField <= MAX_PRICE && priceField >= minPrice) {
    return true;
  }
  return false;
};

function getErrorMessageAdPrice() {
  const adPriceErrorMessage = `Цена за ночь не должна привышать ${ MAX_PRICE } руб. и быть не менее ${ minPrice }`;
  return adPriceErrorMessage;
}

/*
Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей».
*/

const validateAdCapacity = (value) => {
  const rooms = Number(adRoomNumber.value);
  const capacity = Number(value);

  if (rooms === 1 && capacity === 1) {
    return true;
  }
  if (rooms === 2 && (capacity === 1 || capacity === 2)) {
    return true;
  }
  if (rooms === 3 && capacity !== 0) {
    return true;
  }
  if (rooms === 100 && capacity === 0) {
    return true;
  }
  return false;
};

const getErrorCapacityMessage = (capacity) => {
  const rooms = Number(adRoomNumber.value);
  let errorCapacityMessage = '';

  if (capacity !== 1 && rooms === 1) {
    errorCapacityMessage = '1 комната, для 1 гостя';
  }
  if ((capacity > 2 || capacity === 0) && rooms === 2) {
    errorCapacityMessage = '2 комнаты, для 1 или 2 гостей';
  }
  if (rooms === 3 && capacity === 0) {
    errorCapacityMessage = '3 комнаты, для 1, 2 или 3 гостей';
  }
  if (capacity !== 0 && rooms === 100) {
    errorCapacityMessage = '100 комнат не для гостей';
  }
  return errorCapacityMessage;
};

// const validateAdRooms = (value) => {
//   const rooms = Number(value);
//   const capacity = Number(adCapacity.value);

//   if (capacity === 1 && rooms === 1) {
//     return true;
//   }
//   if (capacity === 2 && (rooms === 1 || rooms === 2)) {
//     return true;
//   }
//   if (capacity === 3 && rooms !== 100) {
//     return true;
//   }
//   if (capacity === 0 && rooms === 100) {
//     return true;
//   }
//   return false;
// };

// Поля «Время заезда» и «Время выезда» синхронизированы
// время на выезд должно быть равно времени на вьезд.
const getCheckoutTime = (checkinTime) => {
  const checkoutTime = adTimeOut.value;
  const hourCheckout = Number(checkoutTime.slice(0, 2));
  const hourCheckin = Number(checkinTime.slice(0, 2));
  if (hourCheckout === hourCheckin) {
    console.log(checkinTime);
    console.log(checkoutTime);
    return checkoutTime;
  }
};
getCheckoutTime(adTimeIn.value);

const validateCheckoutTime = (checkinTime) => {
  const checkoutTime = adTimeOut.value;
  console.log(checkinTime);
  console.log(checkoutTime);
  if (checkoutTime === checkinTime) {
    return true;
  }
  return false;
};

pristine.addValidator(adTitle, validateAdTitle, ErrorText.INVALID_TYTLE, true);
pristine.addValidator(adPrice, validateAdPrice, ErrorText.INVALID_PRICE, true, 1);
pristine.addValidator(adPrice, validateAdPriceAmount, getErrorMessageAdPrice(minPrice), true, 2);
pristine.addValidator(adCapacity, validateAdCapacity, getErrorCapacityMessage(Number(adCapacity.value)), true);
// pristine.addValidator(adRoomNumber, validateAdRooms, getErrorCapacityMessage(Number(adRoomNumber.value), Number(adCapacity.value)), true);
pristine.addValidator(adTimeIn, validateCheckoutTime(adTimeIn.value), ErrorText.INVALID_TIME, true);

const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.IDLE;
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

export { addMinPrice, resetForm, setOnFormSubmit };
