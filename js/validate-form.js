const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

const PRICE = /\d/;

const form = document.querySelector('.ad-form');
// const formElements = form.querySelectorAll('.ad-form__element');
const formSubmitButton = form.querySelector('.ad-form__submit');
const formResetButton = form.querySelector('.ad-form__reset');
const adTitle = form.querySelector('#title');
const adPrice = form.querySelector('#price');
const adRoomNumber = form.querySelector('#room_number');
const adCapacity = form.querySelector('#capacity');

// // находим template '#ad-form__error-message'
// const adErrorMessageTemplate = document.querySelector('#ad-form__error-message')
//   .content
//   .querySelector('.ad-form__element--invalid');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const ErrorText = {
  INVALID_TYTLE: `Заголовок объявления должен быть от ${ MIN_TITLE_LENGTH } до ${ MAX_TITLE_LENGTH } символов`,
  INVALID_PRICE: 'Цена за ночь - это числовое поле',
  INVALID_PRICE_AMOUNT: `Цена за ночь не должна привышать ${ MAX_PRICE } руб.`,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
});

// // создание клонированого adErrorMessage по шаблону
// const createErrorMessage = (ErrorMessage) => {
//   const adErrorMessage = adErrorMessageTemplate.cloneNode(true);
//   adErrorMessage.querySelector('.text-help').textContent = ErrorMessage;

//   return adErrorMessage;
// };

// валидация заголовока объявления
const validateAdTitle = (title) => {
  if (title >= MIN_TITLE_LENGTH && title <= MAX_TITLE_LENGTH) {
    return true;
  }
  return false;
};

// валидация цены за ночь
const validateAdPrice = (priceField) => PRICE.test(+priceField);

const validateAdPriceAmount = (priceField) => {
  if (priceField <= MAX_PRICE) {
    return true;
  }
  return false;
};

/*
Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей».
*/
const validateAdCapacity = () => {
  adCapacity.addEventListener('change', (evt) => {
    evt.preventDefault();
    const rooms = adRoomNumber.value;
    const capacity = adCapacity.value;

    if (rooms === 1 && capacity === 1) {
      return true;
    }
    if (rooms === 2 && (capacity === 1 || capacity === 2)) {
      return true;
    }
    if (rooms === 3 && (capacity === 1 || capacity === 2 || capacity === 3)) {
      return true;
    }
    if (rooms === 100 && capacity === 0) {
      return true;
    }

    return false;
  });
};


const validateAdRooms = () => {
  adRoomNumber.addEventListener('change', (evt) => {
    evt.preventDefault();
    const rooms = adRoomNumber.value;
    const capacity = adCapacity.value;

    if (capacity === 1 && rooms === 1) {
      return true;
    }
    if (capacity === 2 && (rooms === 1 || rooms === 2)) {
      return true;
    }
    if (capacity === 3 && (rooms === 1 || rooms === 2 || rooms === 3)) {
      return true;
    }
    if (capacity === 0 && rooms === 100) {
      return true;
    }
    return false;
  });
};

const getErrorCapacityMessage = (rooms, capacity) => {
  adRoomNumber.addEventListener('change', (evt) => {
    evt.preventDefault();
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
  });
};

pristine.addValidator(adTitle, validateAdTitle, ErrorText.INVALID_TYTLE, true);
pristine.addValidator(adPrice, validateAdPrice, ErrorText.INVALID_PRICE, true, 1);
pristine.addValidator(adPrice, validateAdPriceAmount, ErrorText.INVALID_PRICE_AMOUNT, true, 2);
pristine.addValidator(adCapacity, validateAdCapacity, getErrorCapacityMessage(adRoomNumber.value, adCapacity.value), true);
pristine.addValidator(adRoomNumber, validateAdRooms, getErrorCapacityMessage(adRoomNumber.value, adCapacity.value), true);

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
