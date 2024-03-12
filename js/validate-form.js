import { pristine } from './validate-form-fields.js';
import { resetMap } from './map.js';
import { setSlider } from './form-fields.js';

const form = document.querySelector('.ad-form');
const adPrice = form.querySelector('#price');
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
  setSlider(adPrice.placeholder);
  form.reset();
};

const onResetButtonClick = () => {
  resetForm();
  resetMap();
};

/* TODO: код для добавления маркера после отправки формы
const onSubmitButtonClick = () => {
   addPostedMarker();
 };

const submitForm = () => {
  formSubmitButton.addEventListener('click', onSubmitButtonClick);
};
*/

formResetButton.addEventListener('click', onResetButtonClick);

const setOnFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      unblockSubmitButton();
      /* TODO: см. выше
      submitForm();
      */
    } else {
      blockSubmitButton();
    }
  });
};

export { resetForm, setOnFormSubmit };
