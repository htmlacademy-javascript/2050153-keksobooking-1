const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;

// поиск окончаний "сообщения" в зависимости от количества. Стандартная функция.
// get from: https://mihaly4.ru/plural-ili-mnozhestvennoe-chislo-slov-v-js;
const pluralize = (forms, n) => {
  let idx;

  if (n % 10 === 1 && n % 100 !== 11) {
    idx = 0; // one
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 1; // few
  } else {
    idx = 2; // many
  }
  return forms[idx];
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlertMessage = (message, messageContainer) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.zIndex = '1000';
  alertMessage.style.position = 'absolute';
  alertMessage.style.textAlign = 'center';
  if (messageContainer !== document.body) {
    alertMessage.style.padding = '4px';
    alertMessage.style.fontSize = '12px';
    alertMessage.style.backgroundColor = 'rgb(255, 0, 0, 0.8)';
  } else {
    alertMessage.style.height = 'max-content';
    alertMessage.style.width = '100%';
    alertMessage.style.left = '0';
    alertMessage.style.right = '0';
    alertMessage.style.top = '40%';
    alertMessage.style.padding = '10px 3px';
    alertMessage.style.fontSize = '30px';
    alertMessage.style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
  }
  alertMessage.textContent = message;
  messageContainer.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};

// Функция debounce для устранения дребезга взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  pluralize,
  isEscapeKey,
  showAlertMessage,
  debounce,
};
