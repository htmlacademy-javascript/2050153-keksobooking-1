import { pristine } from './validate-form-fields.js';
import { resetMap } from './map.js';
import { updateSlider, removePreviewImg } from './form-fields.js';
import { resetFilters } from './map-filters.js';

const form = document.querySelector('.ad-form');
const formFieldPrice = form.querySelector('#price');
const formSubmitButton = form.querySelector('.ad-form__submit');
const formResetButton = form.querySelector('.ad-form__reset');
const imgPreviewField = form.querySelector('.ad-form__photo');
const avatarImgPreviewField = form.querySelector('.ad-form-header__preview');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const minPriceValue = Number(formFieldPrice.placeholder);

const resetButton = () => {
  formSubmitButton.textContent = SubmitButtonText.IDLE;
};

function blockSubmitButton() {
  formSubmitButton.disabled = true;
  resetButton();
}

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const resetForm = () => {
  pristine.reset();
  form.reset();
  updateSlider(minPriceValue);
  resetButton();
  removePreviewImg(avatarImgPreviewField);
  removePreviewImg(imgPreviewField);
};

const onResetButtonClick = () => {
  resetForm();
  resetMap();
  resetFilters();
};

formResetButton.addEventListener('click', onResetButtonClick);

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

export { resetForm, resetButton, setOnFormSubmit };
