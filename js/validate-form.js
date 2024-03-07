import { pristine } from './validate-form-fields.js';
import { resetMap, addPostedMarker } from './map.js';

const form = document.querySelector('.ad-form');
const formSubmitButton = form.querySelector('.ad-form__submit');
const formResetButton = form.querySelector('.ad-form__reset');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

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
  resetMap();
};

const onSubmitButtonClick = () => {
  addPostedMarker();
};

const submitForm = () => {
  formSubmitButton.addEventListener('click', onSubmitButtonClick);
};

formResetButton.addEventListener('click', onResetButtonClick);

const setOnFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      unblockSubmitButton();
      submitForm();
    } else {
      blockSubmitButton();
    }
  });
};

export { resetForm, setOnFormSubmit };
