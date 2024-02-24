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

const getErrorMessageAdPrice = () =>
  `Цена за ночь не должна привышать ${ MAX_PRICE } руб. и быть не менее ${ minPrice } руб.`;

/*
Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей.
*/
// const validateAdCapacity = (value) => {
//   const rooms = Number(adRoomNumber.value);
//   const capacity = Number(value);

//   if (rooms === 1 && capacity === 1) {
//     return true;
//   }
//   if (rooms === 2 && (capacity === 1 || capacity === 2)) {
//     return true;
//   }
//   if (rooms === 3 && capacity !== 0) {
//     return true;
//   }
//   if (rooms === 100 && capacity === 0) {
//     return true;
//   }
//   return false;
// };

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
    errorCapacityMessage = '1 комната, для 1 гостя';
  }
  if (rooms === 2 && (capacity > 2 || capacity === 0)) {
    errorCapacityMessage = '2 комнаты, для 1 или 2 гостей';
  }
  if (rooms === 3 && capacity === 0) {
    errorCapacityMessage = '3 комнаты, для 1, 2 или 3 гостей';
  }
  if (rooms === 100 && capacity !== 0) {
    errorCapacityMessage = '100 комнат не для гостей';
  }
  return errorCapacityMessage;
};


// время на выезд должно быть равно времени на вьезд.
// const addTime = (currentField, targetedField) => {
//   currentField.addEventListener('change', (evt) => {
//     evt.preventDefault();

//     targetedField.querySelectorAll('option').forEach((item) => {
//       item.selected = item.value === evt.target.value;
//     });
//   });
// };
adTimeIn.addEventListener('change', (event) => {
  adTimeOut.value = event.target.value;
});

adTimeOut.addEventListener('change', (event) => {
  adTimeIn.value = event.target.value;
});


const validateTime = () => {
  // addTime(adTimeIn, adTimeOut);
  // addTime(adTimeOut, adTimeIn);
  const checkoutTime = adTimeOut.value;
  const checkinTime = adTimeIn.value;
  if (checkoutTime === checkinTime) {
    return true;
  }
  return false;
};

pristine.addValidator(adTitle, validateAdTitle, ErrorText.INVALID_TYTLE, true);
pristine.addValidator(adPrice, validateAdPrice, ErrorText.INVALID_PRICE, true);
pristine.addValidator(adPrice, validateAdPriceAmount, getErrorMessageAdPrice, true);
// pristine.addValidator(adCapacity, validateAdCapacity, getErrorCapacityMessage, true);
pristine.addValidator(adRoomNumber, validateAdRooms, getErrorCapacityMessage, true);
pristine.addValidator(adTimeIn, validateTime, ErrorText.INVALID_TIME, true);
pristine.addValidator(adTimeOut, validateTime, ErrorText.INVALID_TIME, true);


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

export { resetForm, setOnFormSubmit };
