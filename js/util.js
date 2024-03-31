const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;

// // получение случайного числа из диапазона
// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// // получение случайного значения из массива
// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// // получение массива случайной длины из значений
// const getArrayFromRandomElements = (chosenArrey) => Array.from(
//   { length: getRandomInteger(0, chosenArrey.length - 1) },
//   () => getRandomArrayElement(chosenArrey),
// );

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

const isEnterKey = (evt) => evt.key === 'Enter';

const showAlertMessage = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.zIndex = '1000';
  alertMessage.style.position = 'absolute';
  alertMessage.style.height = 'max-content';
  alertMessage.style.left = '0';
  alertMessage.style.right = '0';
  alertMessage.style.top = '40%';
  alertMessage.style.padding = '10px 3px';
  alertMessage.style.fontSize = '30px';
  alertMessage.style.textAlign = 'center';
  alertMessage.style.backgroundColor = 'rgb(255, 0, 0, 0.5)';

  alertMessage.textContent = message;
  document.body.append(alertMessage);

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
  // getRandomInteger,
  // getRandomArrayElement,
  // getArrayFromRandomElements,
  pluralize,
  isEscapeKey,
  isEnterKey,
  showAlertMessage,
  debounce,
};
