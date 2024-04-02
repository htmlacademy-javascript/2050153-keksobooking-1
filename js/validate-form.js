import { pristine } from './validate-form-fields.js';
import { resetMap } from './map.js';
import { updateSlider, removePreviewImg } from './form-fields.js';

const form = document.querySelector('.ad-form');
const adPrice = form.querySelector('#price');
const formSubmitButton = form.querySelector('.ad-form__submit');
const formResetButton = form.querySelector('.ad-form__reset');
const adPhotoPreviewField = form.querySelector('.ad-form__photo');
const avatarImgPreviewField = form.querySelector('.ad-form-header__preview');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const minPriceValue = Number(adPrice.placeholder);

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
  removePreviewImg(adPhotoPreviewField);
};

const onResetButtonClick = () => {
  resetForm();
  resetMap();
};

// TODO: код для добавления маркера после отправки формы
// const onSubmitButtonClick = () => {
//    addPostedMarker();
//  };

// const submitForm = () => {
//   formSubmitButton.addEventListener('click', onSubmitButtonClick);
// };


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
