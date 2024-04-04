import { pristine } from './validate-form-fields.js';
import { resetMap } from './map.js';
import { resetSlider, removePreviewImg } from './form-fields.js';
import { resetFilters } from './map-filters.js';

const form = document.querySelector('.ad-form');
const formSubmitButton = form.querySelector('.ad-form__submit');
const formResetButton = form.querySelector('.ad-form__reset');
const imgPreviewField = form.querySelector('.ad-form__photo');
const avatarImgPreviewField = form.querySelector('.ad-form-header__preview');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const resetSubmitButton = () => {
  formSubmitButton.textContent = SubmitButtonText.IDLE;
};

const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  resetSubmitButton();
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const resetForm = () => {
  pristine.reset();
  form.reset();
  resetSlider();
  resetSubmitButton();
  removePreviewImg(avatarImgPreviewField);
  removePreviewImg(imgPreviewField);
};

const onResetButtonClick = () => {
  resetForm();
  resetFilters();
  resetMap();
};

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(form));
      unblockSubmitButton();
    }
  });
};

formResetButton.addEventListener('click', onResetButtonClick);

export { resetForm, resetSubmitButton, setOnFormSubmit };
