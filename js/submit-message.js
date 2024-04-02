import { isEscapeKey } from './util.js';
import { resetButton } from './form.js';
// import { resetMap } from './map.js';

// находим template '#error'
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

// находим template '#success'
const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onBodyClick = (evt) => {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  closeMessage();
};

// функция закрытия сообщения
function closeMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
  resetButton();
}

// функция показа сообщения
const showMessage = (messageElement) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  if (messageElement === errorMessage) {
    messageElement
      .querySelector('.error__button')
      .addEventListener('click', closeMessage);
  }
};

const showSuccessMessage = () => {
  showMessage(successMessage,);
};

const showErrorMessage = () => {
  showMessage(errorMessage);
};

export { showSuccessMessage, showErrorMessage };
